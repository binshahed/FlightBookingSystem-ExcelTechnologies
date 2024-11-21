import moment from "moment";
import Skeleton from "../../components/skeleton/Skeleton";
import { TbTransfer } from "react-icons/tb";
import { TFlight } from "../../types/types.flight";

const FlightDetails = ({
  isLoading,
  flight
}: {
  isLoading: boolean;
  flight: TFlight;
}) => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">
              Flight Number:{" "}
              <span className="text-blue-600">{flight.flightNumber}</span>
            </h2>
            <p className="text-lg text-gray-700">
              Airline:{" "}
              <span className="font-medium text-gray-900">
                {flight.airline}
              </span>
            </p>

            <div className="space-y-2">
              <p className="text-lg text-gray-700">
                Price:{" "}
                <span className="font-medium text-gray-900">
                  Economy:{" "}
                  <span className="text-green-500">
                    ${flight.price.economy}
                  </span>
                  , Business:{" "}
                  <span className="text-blue-500">
                    ${flight.price.business}
                  </span>
                  , First Class:{" "}
                  <span className="text-yellow-500">
                    ${flight.price.firstClass}
                  </span>
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Prices are subject to change based on availability and booking
                time.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {/* Origin Section */}
            <div className="text-center md:text-left ">
              <h3 className="text-lg font-semibold text-gray-700">Origin</h3>
              <p className="text-5xl text-gray-500 font-bold">
                {flight.origin.airportCode}
              </p>
              <p className="text-gray-600">
                {flight.origin.city}, {flight.origin.country}
              </p>

              <h4 className="font-semibold text-gray-600">Departure</h4>
              <p className="text-gray-700">
                {moment(flight.departureTime).format("HH:mm - MMMM Do YYYY")}
              </p>
            </div>

            {/* Transfer Icon */}
            <div className="text-2xl text-gray-500 mx-4">
              <TbTransfer className="text-5xl" />
            </div>

            {/* Destination Section */}
            <div className="text-center md:text-right ">
              <h3 className="text-lg font-semibold text-gray-700">
                Destination
              </h3>
              <p className="text-5xl text-gray-500 font-bold">
                {flight.destination.airportCode}
              </p>
              <p className="text-gray-600">
                {flight.destination.city}, {flight.destination.country}
              </p>

              <h4 className="font-semibold text-gray-600">Arrival</h4>
              <p className="text-gray-700">
                {moment(flight.arrivalTime).format("HH:mm - MMMM Do YYYY")}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FlightDetails;
