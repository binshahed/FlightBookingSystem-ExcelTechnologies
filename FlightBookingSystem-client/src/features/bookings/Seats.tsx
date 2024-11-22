/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "flowbite-react";
import { useState } from "react";
import { TSeat } from "../../types/types.flight";
import { SelectedSeatDrawer } from "../../components/draweres/SelectedSeatDrawer";

const Seats = ({ flight }: { flight: any }) => {
  const [selectedEconomy, setSelectedEconomy] = useState<string[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<string[]>([]);
  const [selectedFirstClass, setSelectedFirstClass] = useState<string[]>([]);

  const handleSeatSelection = (seatNumber: string, classType: string) => {
    switch (classType) {
      case "economy":
        setSelectedEconomy((prev) =>
          prev.includes(seatNumber)
            ? prev.filter((seat) => seat !== seatNumber)
            : [...prev, seatNumber]
        );
        break;
      case "business":
        setSelectedBusiness((prev) =>
          prev.includes(seatNumber)
            ? prev.filter((seat) => seat !== seatNumber)
            : [...prev, seatNumber]
        );
        break;
      case "firstClass":
        setSelectedFirstClass((prev) =>
          prev.includes(seatNumber)
            ? prev.filter((seat) => seat !== seatNumber)
            : [...prev, seatNumber]
        );
        break;
      default:
        break;
    }
  };

  const selectedSeats = {
    economy: selectedEconomy,
    business: selectedBusiness,
    firstClass: selectedFirstClass
  };

  return (
    <div className="space-y-4">
      {["economy", "business", "firstClass"].map((classType) => (
        <div key={classType}>
          <h4 className="font-medium text-gray-600 capitalize">
            {classType} Class
          </h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {flight.seats.seatMap[classType].map((seat: TSeat) => {
              // Determine which state and color to apply
              let selectedSeats;

              let seatColor = "bg-secondary"; // Default color

              if (classType === "economy") {
                selectedSeats = selectedEconomy;

                seatColor = selectedSeats.includes(seat.seatNumber)
                  ? "bg-primary"
                  : "bg-secondary";
              } else if (classType === "business") {
                selectedSeats = selectedBusiness;

                seatColor = selectedSeats.includes(seat.seatNumber)
                  ? "bg-primary"
                  : "bg-secondary";
              } else if (classType === "firstClass") {
                selectedSeats = selectedFirstClass;

                seatColor = selectedSeats.includes(seat.seatNumber)
                  ? "bg-primary"
                  : "bg-secondary";
              }

              return (
                <div key={seat._id}>
                  <Button
                    disabled={seat.isBooked}
                    onClick={() =>
                      handleSeatSelection(seat.seatNumber, classType)
                    }
                    className={seatColor}
                  >
                    {seat.seatNumber}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className=" my-10 flex items-center justify-center">
        <SelectedSeatDrawer selectedSeats={selectedSeats} flight={flight} />
      </div>
    </div>
  );
};

export default Seats;
