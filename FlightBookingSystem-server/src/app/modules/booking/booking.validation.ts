import mongoose from 'mongoose';
import { z } from 'zod';

const createBookingSchema = z.object({
  body: z.object({
    flightId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid 'flightId', must be a valid MongoDB ObjectId",
    }),
    userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid 'userId', must be a valid MongoDB ObjectId",
    }),
    seatId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid 'seatId', must be a valid MongoDB ObjectId",
    }),
    seats: z.object({
      economy: z.array(z.string()).optional(),
      business: z.array(z.string()).optional(),
      firstClass: z.array(z.string()).optional(),
    }),
    totalPrice: z
      .number()
      .min(0, { message: 'Total price must be a positive number' }),
    bookingStatus: z.enum(['confirmed', 'cancelled', 'pending']),
  }),
});
const updateBookingSchema = z.object({
  body: z.object({
    bookingStatus: z.enum(['confirmed', 'cancelled', 'pending']),
  }),
});

export const BookingValidation = {
  createBookingSchema,
  updateBookingSchema,
};
