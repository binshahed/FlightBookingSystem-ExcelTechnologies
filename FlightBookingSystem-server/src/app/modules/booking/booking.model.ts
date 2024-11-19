import { Schema, model } from 'mongoose';

const BookingSchema = new Schema(
  {
    flightId: {
      type: Schema.Types.ObjectId,
      ref: 'Flight',
      required: [true, 'Flight ID is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    seatId: {
      type: Schema.Types.ObjectId,
      ref: 'Seat',
      required: [true, 'Seat ID is required'],
    },
    seats: {
      economy: {
        type: [String],
        default: [],
      },
      business: {
        type: [String],
        default: [],
      },
      firstClass: {
        type: [String],
        default: [],
      },
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be a positive number'],
    },
    bookingStatus: {
      type: String,
      enum: ['confirmed', 'cancelled', 'pending'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

// Export the Mongoose model
export const BookingModel = model('Booking', BookingSchema);
