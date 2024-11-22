/* eslint-disable @typescript-eslint/no-explicit-any */
import HomeCard from "../../components/dashboard/HomeCard";
import { useGetAllUsersQuery } from "../../store/features/auth/authApi";
import { useGetAllBookingQuery } from "../../store/features/booking/bookingApi";
import { useGetAllFlightsQuery } from "../../store/features/flight/flightApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";

const DashboardHome = () => {
  const { data: flightData, isLoading: isFlightLoading } =
    useGetAllFlightsQuery(undefined);
  const { data: userData, isLoading: isUserLoading } =
    useGetAllUsersQuery(undefined);
  const { data: bookingData, isLoading: isBookingLoading } =
    useGetAllBookingQuery(undefined);

  // Process booking data to get insights
  const bookingsByMonth = () => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
      bookings: 0
    }));

    bookingData?.data?.forEach((booking: any) => {
      const monthIndex = new Date(booking.createdAt).getMonth();
      months[monthIndex].bookings += 1;
    });

    return months;
  };

  const earningsByMonth = () => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
      earnings: 0
    }));

    bookingData?.data?.forEach((booking: any) => {
      const monthIndex = new Date(booking.createdAt).getMonth();
      months[monthIndex].earnings += booking.totalPrice;
    });

    return months;
  };

  return (
    <div className="my-10 px-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HomeCard bg="bg-primary">
          <h1 className="text-white font-bold text-3xl">Total Users</h1>
          <p className="text-white font-bold text-xl">
            {isUserLoading ? "Loading..." : userData?.data?.length}
          </p>
        </HomeCard>
        <HomeCard bg="bg-purple-900">
          <h1 className="text-white font-bold text-3xl">Total Flights</h1>
          <p className="text-white font-bold text-xl">
            {isFlightLoading ? "Loading..." : flightData?.data?.length}
          </p>
        </HomeCard>
        <HomeCard bg="bg-pink-900">
          <h1 className="text-white font-bold text-3xl ">Total Bookings</h1>
          <p className="text-white font-bold text-xl">
            {isBookingLoading ? "Loading..." : bookingData?.data?.length}
          </p>
        </HomeCard>
      </div>

      {/* Charts Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bookings Per Month Bar Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-600 mb-4">
              Bookings Per Month
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsByMonth()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Earnings Per Month Line Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-600 mb-4">
              Earnings Per Month
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsByMonth()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="earnings" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
