import Bookings from "../pages/dashboard/user/Bookings";
import Profile from "../pages/dashboard/user/Profile";
import ReviewsPage from "../pages/dashboard/user/ReviewsPage";
import UpcomingBookings from "../pages/dashboard/user/UpcomingBookings";
import UserDashboardHomePage from "../pages/dashboard/user/UserDashboardHomePage";
import {
  LayoutFilled,
  UserOutlined,
  CheckSquareFilled,
  PicLeftOutlined,
  StarFilled
} from "@ant-design/icons";

export const userRoutes = [
  {
    icon: <LayoutFilled />,
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboardHomePage />
  },
  {
    icon: <PicLeftOutlined />,
    name: "Upcoming Bookings",
    path: "upcomingBookings",
    element: <UpcomingBookings />
  },

  {
    icon: <UserOutlined />,
    name: "Profile",
    path: "profile",
    element: <Profile />
  },
  {
    icon: <CheckSquareFilled />,
    name: "Bookings",
    path: "bookings",
    element: <Bookings />
  },
  {
    icon: <StarFilled />,
    name: "Reviews",
    path: "reviews",
    element: <ReviewsPage />
  }
];
