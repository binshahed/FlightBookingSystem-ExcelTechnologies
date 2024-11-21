import { Card } from "flowbite-react"; // Assuming you're using Flowbite's Card component for styling

const BookingCard = ({ booking }: { booking: any }) => {
  return (
    <Card className=" w-full shadow-lg p-4 space-y-4 bg-white border rounded-lg">
      {/* Flight Details */}
      <h3 className="text-lg font-semibold text-gray-800">
        Booking ID: {booking?._id}
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">Flight Number:</p>
          <span className="font-medium text-gray-800">
            {booking?.flightId?.flightNumber}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Airline:</p>
          <span className="font-medium text-gray-800">
            {booking?.flightId?.airline}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Departure:</p>
          <span className="font-medium text-gray-800">
            {new Date(booking?.flightId?.departureTime).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Arrival:</p>
          <span className="font-medium text-gray-800">
            {new Date(booking?.flightId?.arrivalTime).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Price:</p>
          <span className="font-medium text-gray-800">
            ${booking?.totalPrice}
          </span>
        </div>
      </div>

      {/* User Details */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">User:</p>
          <span className="font-medium text-gray-800">
            {booking?.userId?.name}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Email:</p>
          <span className="font-medium text-gray-800">
            {booking?.userId?.email}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Phone:</p>
          <span className="font-medium text-gray-800">
            {booking?.userId?.phone}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Address:</p>
          <span className="font-medium text-gray-800">
            {booking?.userId?.address}
          </span>
        </div>
      </div>

      {/* Seat Information */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">Seats Reserved:</p>
          <span className="font-medium text-gray-800">
            {`Economy: ${booking?.seats?.economy.join(
              ", "
            )} | Business: ${booking?.seats?.business.join(
              ", "
            )} | First Class: ${booking?.seats?.firstClass.join(", ")}`}
          </span>
        </div>
      </div>

      {/* Booking Status */}
      <div className="flex justify-between">
        <p className="text-gray-600">Status:</p>
        <span
          className={`font-medium ${
            booking?.bookingStatus === "confirmed"
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {booking?.bookingStatus}
        </span>
      </div>

      {/* Action Button */}
      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          View Details
        </button>
      </div>
    </Card>
  );
};

export default BookingCard;
