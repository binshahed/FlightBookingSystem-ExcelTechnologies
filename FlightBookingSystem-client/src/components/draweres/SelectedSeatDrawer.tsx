/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Drawer } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSeatBooking } from "../../store/features/booking/bookingSlice";
import { Link } from "react-router-dom";

export function SelectedSeatDrawer({
  selectedSeats,
  flight
}: {
  selectedSeats: any;
  flight: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const dispatch = useDispatch();

  const calculatePrice = (classType: string) => {
    const pricePerSeat = flight.price[classType];
    const selectedSeatsCount = selectedSeats[classType]?.length || 0;
    const totalPrice = pricePerSeat * selectedSeatsCount;

    return { pricePerSeat, selectedSeatsCount, totalPrice };
  };

  const calculateGrandTotal = () => {
    const classes = ["economy", "business", "firstClass"];
    return classes.reduce((total, classType) => {
      const { totalPrice } = calculatePrice(classType);
      return total + totalPrice;
    }, 0);
  };

  const grandTotal = calculateGrandTotal();

  const handleBookSeats = () => {
    const seats = {
      flightId: flight?._id,
      seats: selectedSeats
    };

    dispatch(setSeatBooking(seats));
  };

  const handleDrawerOpen = () => {
    handleBookSeats();
    setIsOpen(true);
  };

  return (
    <>
      <div>
        <Button
          onClick={handleDrawerOpen}
          className="mt-4 bg-primary"
          disabled={
            selectedSeats?.economy.length === 0 &&
            selectedSeats?.business.length === 0 &&
            selectedSeats?.firstClass.length === 0
          }
        >
          Book Seats
        </Button>
      </div>

      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        // className="w-full md:w-1/3"
      >
        <Drawer.Header title="Selected Seats" />
        <Drawer.Items>
          {["economy", "business", "firstClass"].map((classType) => {
            const { pricePerSeat, selectedSeatsCount, totalPrice } =
              calculatePrice(classType);

            return (
              <div key={classType} className="mb-6">
                {/* Class Type */}
                {selectedSeats[classType]?.length > 0 && (
                  <>
                    <h4 className="font-medium text-lg text-gray-700 capitalize">
                      {classType} Class
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {/* Seat Numbers */}
                      {selectedSeats[classType].map(
                        (seat: any, index: number) => (
                          <p
                            key={index}
                            className="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-sm"
                          >
                            {seat}
                          </p>
                        )
                      )}
                    </div>
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">
                          Price per seat:
                        </span>
                        <span className="text-gray-900">${pricePerSeat}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium text-gray-700">
                          Total ({selectedSeatsCount} seat
                          {selectedSeatsCount > 1 ? "s" : ""}):
                        </span>
                        <span className="text-gray-900">${totalPrice}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center font-semibold text-xl text-gray-700">
              <span>Total Price:</span>
              <span className="text-gray-900">${grandTotal}</span>
            </div>
          </div>

          <Link to="/booking" className="mt-8">
            <Button className="w-full">Book Your Seats</Button>
          </Link>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
