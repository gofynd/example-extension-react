import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "./style/billing.css";
import axios from "axios";
import urlJoin from "url-join";

const EXAMPLE_MAIN_URL = window.location.origin;

export const Billing = () => {
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { company_id, application_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
    fetchCurrentSubscription();
  }, [company_id]);

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get(urlJoin(EXAMPLE_MAIN_URL, '/api/billing/plans'), {
        headers: {
          "x-company-id": company_id,
        },
        params: { company_id }
      });
      
      // Handle the response structure: {"plans": [...]}
      const plansArray = data.plans || data;
      
      // Ensure data is an array
      if (Array.isArray(plansArray)) {
        setPlans(plansArray);
      } else {
        console.error("Plans data is not an array:", plansArray);
        setPlans([]);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      setError("Failed to load subscription plans");
      setPlans([]);
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const { data } = await axios.get(urlJoin(EXAMPLE_MAIN_URL, '/api/billing/subscription'), {
        headers: {
          "x-company-id": company_id,
        },
        params: { company_id }
      });
      console.log('Current subscription data:', data);
      
      // If we have a subscription with plan_id, fetch the plan details
      if (data && data.plan_id) {
        try {
          const planResponse = await axios.get(urlJoin(EXAMPLE_MAIN_URL, '/api/billing/plans'), {
            headers: {
              "x-company-id": company_id,
            },
            params: { company_id }
          });
          
          const plans = planResponse.data.plans || planResponse.data;
          const currentPlan = plans.find(plan => plan.id === data.plan_id);
          
          if (currentPlan) {
            // Merge plan details with subscription data
            setCurrentSubscription({
              ...data,
              plan_name: currentPlan.name,
              plan_price: currentPlan.price,
              plan_interval: currentPlan.interval
            });
          } else {
            setCurrentSubscription(data);
          }
        } catch (planError) {
          console.error("Error fetching plan details:", planError);
          setCurrentSubscription(data);
        }
      } else {
        setCurrentSubscription(data);
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
      setCurrentSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId) => {
    try {
      console.log('Subscribing to plan:', planId);
      // Use the same callback URL pattern as the working extension
      const callbackUrl = `${EXAMPLE_MAIN_URL}/company/${company_id}/subscription-status`;
      const { data } = await axios.post(urlJoin(EXAMPLE_MAIN_URL, '/api/billing/subscribe'), {
        company_id,
        plan_id: planId,
        callback_url: callbackUrl
      }, {
        headers: {
          "x-company-id": company_id,
        }
      });
      
      console.log('Subscription response:', data);
      
      // Redirect to Fynd's billing page
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      }
    } catch (error) {
      console.error("Error subscribing to plan:", error);
      setError("Failed to subscribe to plan");
    }
  };

  const handleContinueToExtension = () => {
    // Navigate to the main extension page
    if (application_id) {
      navigate(`/company/${company_id}/application/${application_id}`);
    } else {
      navigate(`/company/${company_id}/`);
    }
  };

  if (loading) {
    return <div className="loader">Loading billing information...</div>;
  }

  if (error) {
    return (
      <div className="billing-container">
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="billing-container">
      <div className="title">
        Subscription Plans
      </div>

      {currentSubscription && currentSubscription.status === 'active' && (
        <div className="current-subscription">
          <h3>Current Subscription</h3>
          <div className="subscription-details">
            <p><strong>Plan:</strong> {currentSubscription.plan_name}</p>
            <p><strong>Status:</strong> {currentSubscription.status}</p>
            <p><strong>Activated:</strong> {new Date(currentSubscription.activated_on).toLocaleDateString()}</p>
            <p><strong>Price:</strong> ₹{currentSubscription.plan_price?.amount}/{currentSubscription.plan_interval}</p>
          </div>
          <button 
            className="continue-button"
            onClick={handleContinueToExtension}
          >
            Continue to Extension
          </button>
        </div>
      )}

      {(!currentSubscription || currentSubscription.status !== 'active') && (
        <div className="plans-grid">
          {Array.isArray(plans) && plans.length > 0 ? (
            plans.map((plan) => (
              <div key={plan.id} className="plan-card">
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    ₹{plan.price.amount}/{plan.interval}
                  </div>
                </div>
                <div className="plan-tagline">{plan.tagline}</div>
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button 
                  className="subscribe-button"
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={currentSubscription?.plan_id === plan.id && currentSubscription?.status === 'active'}
                >
                  {currentSubscription?.plan_id === plan.id && currentSubscription?.status === 'active' ? 'Current Plan' : 'Subscribe'}
                </button>
              </div>
            ))
          ) : (
            <div className="no-plans">
              <p>No subscription plans available at the moment.</p>
              <button 
                className="continue-button"
                onClick={handleContinueToExtension}
              >
                Continue to Extension
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 