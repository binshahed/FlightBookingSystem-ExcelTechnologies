import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "/profile",
        element: <h1>Profile Page</h1>
      },

      {
        path: "login",
        element: (
          <PublicRoute>
            <h1>Login Page</h1>
          </PublicRoute>
        )
      },
      {
        path: "sign-up",
        element: (
          <PublicRoute>
            <h1>Sign Up Page</h1>
          </PublicRoute>
        )
      }
    ]
    // errorElement: <NotFoundPage />
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        {/* <DashboardLayout /> */}
        <h1>Admin Page</h1>
      </ProtectedRoute>
    ),
    children: []
  },

  {
    path: "/*",
    element: <h1>Page Not Found</h1>
  }
]);

export default router;
