import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import urlJoin from "url-join";
import "./style/subscription-status.css";

const EXAMPLE_MAIN_URL = window.location.origin;

export const SubscriptionStatus = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { company_id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const subscription_id = searchParams.get('subscription_id');
  const approved = searchParams.get('approved');

  useEffect(() => {
    if (approved === 'true' && subscription_id) {
      updateSubscriptionStatus();
    } else {
      // Subscription not approved, redirect to billing
      navigate(`/company/${company_id}/billing`);
    }
  }, [approved, subscription_id]);

  const updateSubscriptionStatus = async () => {
    try {
      console.log('Updating subscription status for:', subscription_id);
      
      const { data } = await axios.post(
        urlJoin(EXAMPLE_MAIN_URL, `/api/billing/subscription/${subscription_id}/status`),
        {},
        {
          headers: {
            "x-company-id": company_id,
          }
        }
      );

      console.log('Subscription status response:', data);

      if (data && data.status === "active") {
        // Success - redirect to main app
        navigate(`/company/${company_id}`);
      } else {
        // Failed - redirect to billing
        console.log('Subscription not active, redirecting to billing');
        navigate(`/company/${company_id}/billing`);
      }
    } catch (err) {
      console.error("Error updating subscription status:", err);
      setError("Failed to update subscription status");
      // Still redirect to billing page after a delay
      setTimeout(() => {
        navigate(`/company/${company_id}/billing`);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="subscription-status-container">
        <div className="loader">Processing subscription...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subscription-status-container">
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
          <p>Redirecting to billing page...</p>
        </div>
      </div>
    );
  }

  return null; // Component will redirect
}; 