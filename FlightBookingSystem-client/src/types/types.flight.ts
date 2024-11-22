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



interface SeatConfig {
  rows: number;
  columns: { value: string }[];
}

export interface FlightFormData {
  flight: {
    flightNumber: string;
    airline: string;
    origin: {
      airportCode: string;
      city: string;
      country: string;
    };
    destination: {
      airportCode: string;
      city: string;
      country: string;
    };
    departureTime: string;
    arrivalTime: string;
    price: {
      economy: number;
      business: number;
      firstClass: number;
    };
  };
  seats: {
    [key in "economy" | "business" | "firstClass"]: SeatConfig;
  };
}