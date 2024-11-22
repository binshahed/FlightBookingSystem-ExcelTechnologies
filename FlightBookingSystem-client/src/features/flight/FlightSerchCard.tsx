import moment from "moment";
import Skeleton from "../../components/skeleton/Skeleton";
import { TbTransfer } from "react-icons/tb";
import { TFlight } from "../../types/types.flight";
import { Link } from "react-router-dom";

const FlightSearchCard = ({
  isLoading,
  flight
}: {
  isLoading: boolean;
  flight: TFlight;
}) => {
  return (
    <Link
      to={`/flight/${flight?._id}`}
      className="bg-white shadow-lg rounded-lg p-6 space-y-6 mt-2 block"
    >
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
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
          </div>

          {/* Price Section */}
          <div className="text-lg text-gray-700">
            Price:{" "}
            <span className="font-medium text-gray-900">
              Economy:{" "}
              <span className="text-green-500">${flight.price.economy}</span>,{" "}
              Business:{" "}
              <span className="text-blue-500">${flight.price.business}</span>,{" "}
              First Class:{" "}
              <span className="text-yellow-500">
                ${flight.price.firstClass}
              </span>
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Prices are subject to change based on availability and booking time.
          </p>

          {/* Flight Route Section */}
          <div className="flex justify-between flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Origin */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-700">Origin</h3>
              <p className="text-3xl text-gray-500 font-bold">
                {flight.origin.airportCode}
              </p>
              <p className="text-gray-600">
                {flight.origin.city}, {flight.origin.country}
              </p>
              <p className="text-gray-700">
                Departure:{" "}
                {moment(flight.departureTime).format("HH:mm - MMMM Do YYYY")}
              </p>
            </div>

            {/* Transfer Icon */}
            <div className="text-2xl text-gray-500">
              <TbTransfer className="text-4xl" />
            </div>

            {/* Destination */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-gray-700">
                Destination
              </h3>
              <p className="text-3xl text-gray-500 font-bold">
                {flight.destination.airportCode}
              </p>
              <p className="text-gray-600">
                {flight.destination.city}, {flight.destination.country}
              </p>
              <p className="text-gray-700">
                Arrival:{" "}
                {moment(flight.arrivalTime).format("HH:mm - MMMM Do YYYY")}
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        Hello Mr/Ms ${},
        <br />
        Your Flight Booked SuccessFully Booked, Flight Number is ${} date is ${}
      </div>
    </Link>
  );
};

export default FlightSearchCard;
