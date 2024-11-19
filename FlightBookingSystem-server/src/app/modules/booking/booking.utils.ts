type Seat = {
  seatNumber: string;
  isBooked: boolean;
};

type SeatMap = {
  economy?: Seat[];
  business?: Seat[];
  firstClass?: Seat[];
};

type InputSeats = {
  economy?: string[];
  business?: string[];
  firstClass?: string[];
};

type UnavailableSeat = {
  seat: string;
  reason?: string;
};

export const isSeatAvailable = (seatMap: SeatMap, inputSeats: InputSeats) => {
  const unavailableSeats: UnavailableSeat[] = [];

  for (const [classType, seats] of Object.entries(inputSeats)) {
    if (!seatMap[classType as keyof SeatMap]) {
      unavailableSeats.push(...seats!.map((seat) => ({ seat })));
      continue;
    }

    for (const seat of seats!) {
      const seatData = seatMap[classType as keyof SeatMap]!.find(
        (s) => s.seatNumber === seat,
      );
      if (!seatData) {
        unavailableSeats.push({ seat });
      } else if (seatData.isBooked) {
        unavailableSeats.push({ seat });
      }
    }
  }

  if (unavailableSeats.length !== 0) {
    const arr = unavailableSeats.map((s) => s.seat);

    const errorMessage =
      arr.slice(0, arr.length).join(', ') + ' Seats are not available';

    throw new Error(errorMessage);
  }
};
