import AdminDashboardHome from "../pages/dashboard/admin/AdminDashboardHome";
import Bookings from "../pages/dashboard/admin/Bookings";

import Service from "../pages/dashboard/admin/serviceManagement/Service";
import Slots from "../pages/dashboard/admin/slotManagement/Slots";
import Users from "../pages/dashboard/admin/userManagement/Users";
import {
  LayoutFilled,
  CheckSquareFilled,
  UserOutlined,
  ProfileFilled,
  CalendarFilled
} from "@ant-design/icons";

export const adminRoutes = [
  {
    icon: <LayoutFilled />,
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboardHome />
  },
  {
    icon: <CheckSquareFilled />,
    name: "Booking",
    path: "bookings",
    element: <Bookings />
  },
  {
    icon: <UserOutlined />,
    name: "Users",
    path: "users",
    element: <Users />
  },

  {
    icon: <ProfileFilled />,
    name: "Services",
    path: "service",
    element: <Service />
  },
  {
    icon: <CalendarFilled />,
    name: "Slots",
    path: "slot",
    element: <Slots />
  }
];
