import { createBrowserRouter } from "react-router-dom";
import { routeGuard } from "./guard";

import App from "../App";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/company/:company_id/",
    element: <App />,
    loader: routeGuard,
  },
  {
    path: "/company/:company_id/application/:application_id",
    element: <App />,
    loader: routeGuard,
  },
  {
    path: "/*", // Fallback route for all unmatched paths
    element: <NotFound />, // Component to render for unmatched paths
  },
]);

export default router;
