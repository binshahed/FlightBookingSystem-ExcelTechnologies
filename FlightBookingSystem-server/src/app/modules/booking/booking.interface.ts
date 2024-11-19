import mongoose from 'mongoose';

export type TBooking = {
  flightId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  seatId: mongoose.Types.ObjectId;
  seats: {
    economy: string[];
    business: string[];
    firstClass: string[];
  };
  totalPrice: number;
  bookingStatus: 'confirmed' | 'cancelled' | 'pending';
};
