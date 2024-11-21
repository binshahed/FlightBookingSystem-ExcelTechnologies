import { useFlightDetailsQuery } from "../store/features/flight/flightApi";
import { useParams } from "react-router-dom";

import Skeleton from "../components/skeleton/Skeleton";
import Seats from "../features/bookings/Seats";

import FlightDetails from "../features/flight/FlightDetails";

const FlightDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFlightDetailsQuery(id);

  // States for each class type

  if (isError || !data?.data) {
    return (
      <div className="container mx-auto text-center text-red-500">
        Unable to fetch flight details.
      </div>
    );
  }

  const flight = data.data;

  // Toggle seat selection based on class type

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Flight Details
      </h1>

      {/* Flight Overview */}
      <FlightDetails isLoading={isLoading} flight={flight} />

      {/* Seat Availability */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Seat Availability
        </h3>
        {isLoading ? <Skeleton /> : <Seats flight={flight} />}
      </div>
    </div>
  );
};

export default FlightDetailsPage;
