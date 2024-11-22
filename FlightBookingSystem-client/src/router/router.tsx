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
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardBooking from "../pages/dashboard/DashboardBooking";
import DashboardFlights from "../pages/dashboard/DashboardFlights";
import DashboardCreateFlight from "../pages/dashboard/DashboardCreateFlight";
import NotFoundPage from "../pages/NotFoundPage";

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
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />
      },
      {
        path: "flights",
        element: <DashboardFlights />
      },
      {
        path: "flights/create",
        element: <DashboardCreateFlight />
      },

      {
        path: "bookings",
        element: <DashboardBooking />
      }
    ]
  },

  {
    path: "/*",
    element: <NotFoundPage />
  }
]);

export default router;
