import mongoose from 'mongoose';

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



export type TFlight = {
  flightNumber: string;
  airline: string;
  origin: TAirport;
  destination: TAirport;
  departureTime: string;
  arrivalTime: string;
  price: TPrice;
  seats: mongoose.Types.ObjectId;
  isDeleted: boolean;
};
