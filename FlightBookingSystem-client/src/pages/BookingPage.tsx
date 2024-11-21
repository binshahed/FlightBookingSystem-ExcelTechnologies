import { useSelectedFlight } from "../store/features/booking/bookingSlice";
import { useFlightDetailsQuery } from "../store/features/flight/flightApi";
import { useAppSelector } from "../store/hooks";
import FlightDetails from "../features/flight/FlightDetails";
import { BookingForm } from "../features/bookings/BookingForm";
import { useNavigate } from "react-router-dom";

// Define seat class keys
type SeatClasses = "economy" | "business" | "firstClass";

const BookingPage = () => {
  const seats = useAppSelector(useSelectedFlight);
  const navigate = useNavigate();
  if (
    seats.seats.economy?.length === 0 &&
    seats.seats.business?.length === 0 &&
    seats.seats.firstClass?.length === 0
  ) {
    navigate("/");
  }

  const { data, isLoading } = useFlightDetailsQuery(seats.flightId);

  const flight = data?.data;

  // Seat classes array
  const seatClasses: SeatClasses[] = ["economy", "business", "firstClass"];

  // Calculate price details for each class
  const priceDetails = seatClasses.map((classType) => {
    const seatsForClass = seats?.seats?.[classType] || [];
    const pricePerSeat = flight?.price?.[classType] || 0;
    const totalForClass = pricePerSeat * seatsForClass.length;
    return {
      classType,
      seats: seatsForClass,
      pricePerSeat,
      totalForClass
    };
  });

  const grandTotal = priceDetails.reduce(
    (acc, curr) => acc + curr.totalForClass,
    0
  );

  const submitData = {
    seats
  };

  return (
    <div className="container">
      <h2 className="my-10 text-center text-5xl">Booking</h2>

      <FlightDetails isLoading={isLoading} flight={flight} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div>
          {/* Flight Details */}

          {/* Consolidated Seats & Pricing Card */}
          <div className="my-10">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
              {/* Section Header */}
              <h5 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                Seat Summary
              </h5>

              {/* Price Breakdown */}
              <div className="mb-4 space-y-6">
                {priceDetails.map(
                  ({ classType, seats, pricePerSeat, totalForClass }) =>
                    seats.length > 0 && (
                      <div key={classType}>
                        {/* Class Type Header */}
                        <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
                          <span className="capitalize">{classType}:</span>
                          <span>
                            ${pricePerSeat} × {seats.length}
                          </span>
                        </div>

                        {/* Seat Numbers */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {seats.map((seat, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow"
                            >
                              {seat}
                            </span>
                          ))}
                        </div>

                        {/* Total for Class */}
                        <div className="flex justify-between items-center text-sm font-semibold">
                          <span>Total for {classType}:</span>
                          <span>${totalForClass}</span>
                        </div>
                      </div>
                    )
                )}
              </div>

              {/* Divider */}
              <div className="border-t pt-2">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Grand Total:</span>
                  <span className="text-blue-700">${grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <BookingForm submitData={submitData.seats} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
