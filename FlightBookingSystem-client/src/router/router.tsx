import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";
import FlightDetailsPage from "../pages/FlightDetailsPage";
import BookingPage from "../pages/BookingPage";
import ProfilePage from "../pages/ProfilePage";

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
        path: "search",
        element: <SearchPage />
      },
      {
        path: "flight/:id",
        element: <FlightDetailsPage />
      },
      {
        path: "booking",
        element: (
          <ProtectedRoute>
            <BookingPage />s
          </ProtectedRoute>
        )
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },

      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "register",
        element: <RegisterPage />
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
