import HomeCard from "../../components/dashboard/HomeCard";

import { useGetAllUsersQuery } from "../../store/features/auth/authApi";
import { useGetAllBookingQuery } from "../../store/features/booking/bookingApi";
import { useGetAllFlightsQuery } from "../../store/features/flight/flightApi";

const DashboardHome = () => {
  const { data: flightData, isLoading: isFlightLoading } =
    useGetAllFlightsQuery(undefined);
  const { data: userData, isLoading: isUserLoading } =
    useGetAllUsersQuery(undefined);
  const { data: bookingData, isLoading: isBookingLoading } =
    useGetAllBookingQuery(undefined);

  console.log(userData);

  return (
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HomeCard bg="bg-primary">
          <h1 className="text-white font-bold text-3xl">Total Users</h1>
          <p className="text-white font-bold text-xl">
            {isUserLoading ? "Loading..." : userData?.data?.length}
          </p>
        </HomeCard>
        <HomeCard bg="bg-purple-900">
          <h1 className="text-white  font-bold text-3xl">Total Flights</h1>
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
    </div>
  );
};

export default DashboardHome;
