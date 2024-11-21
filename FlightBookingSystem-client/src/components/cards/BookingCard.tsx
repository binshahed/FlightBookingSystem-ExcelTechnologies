/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "flowbite-react";

const BookingCard = ({ booking }: { booking: any }) => {
  return (
    <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white border">
      {/* Header Section */}
      <h3 className="text-xl font-bold text-gray-900">
        Booking ID: <span className="text-blue-600">{booking?._id}</span>
      </h3>

      {/* Flight Details */}
      <div className="mt-4 space-y-3">
        <div className="flex justify-between">
          <p className="text-gray-600">Flight Number:</p>
          <span className="text-gray-800 font-medium">
            {booking?.flightId?.flightNumber || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Airline:</p>
          <span className="text-gray-800 font-medium">
            {booking?.flightId?.airline || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Departure:</p>
          <span className="text-gray-800 font-medium">
            {booking?.flightId?.departureTime
              ? new Date(booking?.flightId?.departureTime).toLocaleString()
              : "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Arrival:</p>
          <span className="text-gray-800 font-medium">
            {booking?.flightId?.arrivalTime
              ? new Date(booking?.flightId?.arrivalTime).toLocaleString()
              : "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Price:</p>
          <span className="text-gray-800 font-medium">
            ${booking?.totalPrice || "N/A"}
          </span>
        </div>
      </div>

      {/* User Details */}
      <div className="mt-6 space-y-3">
        <h4 className="text-lg font-semibold text-gray-800">
          Passenger Details
        </h4>
        <div className="flex justify-between">
          <p className="text-gray-600">Name:</p>
          <span className="text-gray-800 font-medium">
            {booking?.userId?.name || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Email:</p>
          <span className="text-gray-800 font-medium">
            {booking?.userId?.email || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Phone:</p>
          <span className="text-gray-800 font-medium">
            {booking?.userId?.phone || "N/A"}
          </span>
        </div>
      </div>

      {/* Seat Information */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800">Seats Reserved</h4>
        <p className="mt-2 text-gray-700">
          <span className="font-medium">Economy:</span>{" "}
          {booking?.seats?.economy?.join(", ") || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Business:</span>{" "}
          {booking?.seats?.business?.join(", ") || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">First Class:</span>{" "}
          {booking?.seats?.firstClass?.join(", ") || "N/A"}
        </p>
      </div>

      {/* Booking Status */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-600 font-medium">Status:</p>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            booking?.bookingStatus === "confirmed"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {booking?.bookingStatus || "Pending"}
        </span>
      </div>
    </Card>
  );
};

export default BookingCard;
