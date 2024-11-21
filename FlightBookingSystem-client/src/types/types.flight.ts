export type TAirport = {
  airportCode: string;
  city: string;
  country: string;
};

export type TPrice = {
  economy: number;
  business: number;
  firstClass: number;
};

export type TSeat = {
  _id: string;
  seatNumber: string;
  isBooked: boolean;
};

export type TSeats = {
  _id: string;
  flightNumber: string;
  seatMap: {
    economy: [TSeat];
    business: [TSeat];
    firstClass: [TSeat];
  };
};

export type TFlight = {
  _id: string;
  flightNumber: string;
  airline: string;
  origin: TAirport;
  destination: TAirport;
  departureTime: string;
  arrivalTime: string;
  price: TPrice;
  seats: TSeats;
  isDeleted: boolean;
};
