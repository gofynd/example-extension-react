import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import { Billing } from "./pages/Billing";
import { SubscriptionStatus } from "./pages/SubscriptionStatus";

const router = createBrowserRouter([
  {
    path: "/company/:company_id/",
    element: <App />,
  },
  {
    path: "/company/:company_id/application/:application_id",
    element: <App />,
  },
  {
    path: "/company/:company_id/billing",
    element: <Billing />,
  },
  {
    path: "/company/:company_id/application/:application_id/billing",
    element: <Billing />,
  },
  {
    path: "/company/:company_id/subscription-status",
    element: <SubscriptionStatus />,
  },
  {
    path: "/*", // Fallback route for all unmatched paths
    element: <NotFound />, // Component to render for unmatched paths
  },
]);

export default router;
