import { Schema, model } from 'mongoose';
import { TSeats } from './seat.interface';

// Seat schema
const SeatSchema = new Schema<TSeats>(
  {
    flightNumber: {
      type: String,
      required: [true, 'Flight number is required'],
      unique: true,
    },
    seatMap: {
      economy: [
        {
          seatNumber: {
            type: String,
            required: [true, 'Economy seat number is required'],
          },
          isBooked: { type: Boolean, default: false },
        },
      ],
      business: [
        {
          seatNumber: {
            type: String,
            required: [true, 'Business seat number is required'],
          },
          isBooked: { type: Boolean, default: false },
        },
      ],
      firstClass: [
        {
          seatNumber: {
            type: String,
            required: [true, 'First-class seat number is required'],
          },
          isBooked: { type: Boolean, default: false },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

// Export the Mongoose model
export const SeatModel = model<TSeats>('Seat', SeatSchema);
