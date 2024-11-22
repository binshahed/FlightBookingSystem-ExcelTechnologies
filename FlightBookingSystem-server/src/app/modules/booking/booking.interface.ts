import mongoose from 'mongoose';
import { TFlight } from '../flight/flight.interface';
import { TUser } from '../auth/auth.interface';

export type TBooking = {
  flightId: mongoose.Types.ObjectId | TFlight;
  userId: mongoose.Types.ObjectId | TUser;
  seatId: mongoose.Types.ObjectId;
  seats: {
    economy: string[];
    business: string[];
    firstClass: string[];
  };
  totalPrice: number;
  bookingStatus: 'confirmed' | 'cancelled' | 'pending';
};
