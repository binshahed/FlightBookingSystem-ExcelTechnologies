/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status-codes';
import AppError from '../../errors/AppError';

import mongoose from 'mongoose';

import { TBooking } from './booking.interface';
import { FlightModel } from '../flight/flight.model';
import { UserModel } from '../auth/auth.model';
import { SeatModel } from '../seat/seat.model';
import { isSeatAvailable } from './booking.utils';
import { BookingModel } from './booking.model';

type TSeatMap = {
  economy: { seatNumber: string; isBooked: boolean }[];
  business: { seatNumber: string; isBooked: boolean }[];
  firstClass: { seatNumber: string; isBooked: boolean }[];
};

const createBooking = async (payLoad: TBooking, userId: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate Flight
    const flight = await FlightModel.findById(payLoad.flightId).session(
      session,
    );
    if (!flight || flight.isDeleted)
      throw new AppError(httpStatus.NOT_FOUND, 'Flight not found');

    // Validate User
    const user = await UserModel.findById(userId).session(session);
    if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

    // Get the Seat Map for the Flight
    const seats = await SeatModel.findById(flight.seats).session(session);
    if (!seats) throw new AppError(httpStatus.NOT_FOUND, 'Seats Not Found');

    // Check Seat Availability
    isSeatAvailable(seats.seatMap, payLoad.seats);

    // Calculate the total price based on the selected seats
    const totalPrice =
      (payLoad.seats?.economy
        ? payLoad.seats?.economy?.length * flight.price.economy
        : 0) +
      (payLoad.seats?.business
        ? payLoad.seats?.business?.length * flight.price.business
        : 0) +
      (payLoad.seats?.firstClass
        ? payLoad.seats?.firstClass?.length * flight.price.firstClass
        : 0);

    // Create the Booking
    const booking = new BookingModel({
      flightId: flight?._id,
      seatId: seats?._id,
      userId: user?._id,
      seats: payLoad.seats,
      totalPrice: totalPrice,
    });

    // Save the booking document
    const bookingResult = await booking.save({ session });

    // Update Seat Availability
    const updateSeatsPromises: Promise<any>[] = [];

    for (const classType of Object.keys(payLoad.seats) as (keyof TSeatMap)[]) {
      const seatsToUpdate = payLoad.seats[classType];

      for (const seatNumber of seatsToUpdate) {
        // Use array filters to locate and update the seat directly within MongoDB
        const updateResult = await SeatModel.updateOne(
          {
            _id: seats._id, // Ensure you're targeting the correct `seatMap` document
            [`seatMap.${classType}.seatNumber`]: seatNumber,
          },
          {
            $set: {
              [`seatMap.${classType}.$[elem].isBooked`]: true,
            },
          },
          {
            arrayFilters: [{ 'elem.seatNumber': seatNumber }], // Match the specific seat
            session,
          },
        );

        if (updateResult.modifiedCount === 0) {
          throw new AppError(
            httpStatus.NOT_FOUND,
            `Seat ${seatNumber} not found`,
          );
        }
      }
    }

    // Wait for all seat updates to complete
    await Promise.all(updateSeatsPromises);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return bookingResult;
  } catch (error: any) {
    // Rollback transaction in case of errors
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Error creating booking: ${error.message}`,
    );
  }
};

const getUserBookings = async (userId: any) => {
  const bookings = await BookingModel.find({ userId })
    .populate('flight')
    .populate('user');
  return bookings;
};

const getAllBookings = async () => {
  const bookings = await BookingModel.find()
    .populate('flight')
    .populate('user');
  return bookings;
};

const updateBooking = async (bookingId: string, payload: TBooking) => {
  const booking = await BookingModel.findById(bookingId);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking Not Found');
  }

  const seats = await SeatModel.findById(booking?.seatId);

  if (!seats) {
    throw new AppError(httpStatus.NOT_FOUND, 'Seats Not Found');
  }

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (payload.bookingStatus === 'confirmed') {
    const confirmedBooking = await BookingModel.findByIdAndUpdate(
      booking?._id,
      { bookingStatus: 'confirmed' },
    );

    return confirmedBooking;
  } else if (payload.bookingStatus === 'cancelled') {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // update the bookings
      await BookingModel.findByIdAndUpdate(
        booking?._id,
        {
          bookingStatus: 'cancelled',
        },
        { session },
      );

      // update the seats

      const updateSeatsPromises: Promise<any>[] = [];

      if (!booking.seats) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'No seats associated with this booking',
        );
      }

      for (const classType of Object.keys(
        booking.seats,
      ) as (keyof TSeatMap)[]) {
        const seatsToUpdate = booking.seats[classType];

        for (const seatNumber of seatsToUpdate) {
          // Use array filters to locate and update the seat directly within MongoDB
          const updateResult = await SeatModel.updateOne(
            {
              _id: seats._id, // Ensure you're targeting the correct `seatMap` document
              [`seatMap.${classType}.seatNumber`]: seatNumber,
            },
            {
              $set: {
                [`seatMap.${classType}.$[elem].isBooked`]: false,
              },
            },
            {
              arrayFilters: [{ 'elem.seatNumber': seatNumber }], // Match the specific seat
              session,
            },
          );

          if (updateResult.modifiedCount === 0) {
            throw new AppError(
              httpStatus.NOT_FOUND,
              `Seat ${seatNumber} not found`,
            );
          }
        }
      }

      // Wait for all seat updates to complete
      const updateSeats = await Promise.all(updateSeatsPromises);

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return updateSeats;
    } catch (err: any) {
      await session.commitTransaction();
      session.endSession();
      throw new Error('something went wrong');
    }
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid booking status');
  }
};
const deleteBooking = async (bookingId: string) => {
  const booking = await BookingModel.findById(bookingId);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking Not Found');
  }

  const seats = await SeatModel.findById(booking?.seatId);

  if (!seats) {
    throw new AppError(httpStatus.NOT_FOUND, 'Seats Not Found');
  }

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // delete the bookings
    await BookingModel.findByIdAndDelete(
      booking?._id,

      { session },
    );

    // update  seats booking status

    const updateSeatsPromises: Promise<any>[] = [];

    if (!booking.seats) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No seats associated with this booking',
      );
    }

    for (const classType of Object.keys(booking.seats) as (keyof TSeatMap)[]) {
      const seatsToUpdate = booking.seats[classType];

      for (const seatNumber of seatsToUpdate) {
        // Use array filters to locate and update the seat directly within MongoDB
        const updateResult = await SeatModel.updateOne(
          {
            _id: seats._id, // Ensure you're targeting the correct `seatMap` document
            [`seatMap.${classType}.seatNumber`]: seatNumber,
          },
          {
            $set: {
              [`seatMap.${classType}.$[elem].isBooked`]: false,
            },
          },
          {
            arrayFilters: [{ 'elem.seatNumber': seatNumber }], // Match the specific seat
            session,
          },
        );

        if (updateResult.modifiedCount === 0) {
          throw new AppError(
            httpStatus.NOT_FOUND,
            `Seat ${seatNumber} not found`,
          );
        }
      }
    }

    // Wait for all seat updates to complete
    const updateSeats = await Promise.all(updateSeatsPromises);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return updateSeats;
  } catch (err: any) {
    await session.commitTransaction();
    session.endSession();
    throw new Error('something went wrong');
  }
};

export const bookingService = {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
