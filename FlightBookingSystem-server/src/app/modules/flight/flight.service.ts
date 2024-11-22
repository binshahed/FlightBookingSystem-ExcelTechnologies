/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TFlight } from './flight.interface';
import { FlightModel } from './flight.model';
import { TSeats, TSeatInput } from '../seat/seat.interface';
import mongoose from 'mongoose';
import { createSeatsForFlightWithSeatMap } from '../seat/seat.utils';
import { SeatModel } from '../seat/seat.model';
import { QueryBuilder } from '../../builder/QueryBuilder';

const createFlight = async (payLoad: {
  flight: TFlight;
  seats: TSeatInput;
}): Promise<TFlight> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const createSeatPlan = createSeatsForFlightWithSeatMap(payLoad.seats);

    const seatPayload: TSeats = {
      flightNumber: payLoad.flight.flightNumber,
      seatMap: createSeatPlan,
    };

    // Create seat data
    const seat = await SeatModel.create([seatPayload], { session });
    if (!seat || seat.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Seat creation failed');
    }

    // Add seat reference to flight payload
    const flightPayload: TFlight = {
      ...payLoad.flight,
      seats: seat[0]._id,
    };

    // Create flight
    const flight = await FlightModel.create([flightPayload], { session });
    if (!flight || flight.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Flight is not created');
    }


    

    // Commit the transaction
    await session.commitTransaction();

    // Return the created flight
    return flight[0];
  } catch (error: any) {
    // Rollback the transaction
    await session.abortTransaction();

    // Throw the error
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Error creating flight: ${error.message}`,
    );
  } finally {
    // End the session
    await session.endSession();
  }
};

const getAllFlights = async () => {
  const flights = await FlightModel.find({ isDeleted: { $ne: true } })
    .sort('-createdAt')
    .populate('seats');
  return flights;
};

const getFlightById = async (id: string) => {
  const flight = await FlightModel.findById(id).populate('seats');

  if (!flight || flight.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Flight not found');
  }

  return flight;
};
const deleteFlightById = async (id: string) => {
  const flight = await FlightModel.findByIdAndUpdate(id, {
    isDeleted: true,
  });

  if (!flight || flight.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Flight not found');
  }

  return {};
};

const updateFlightById = async (id: string, payLoad: TFlight) => {
  const findFlight = await FlightModel.findById(id);

  if (!findFlight || findFlight.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Flight not found');
  }

  const flight = await FlightModel.findByIdAndUpdate(id, payLoad, {
    new: true,
  });

  return flight;
};

const searchFlights = async (query: any) => {
  const flights = new QueryBuilder(
    FlightModel.find({ isDeleted: { $ne: true } }),
    query,
  ).search([
    'origin.city',
    'origin.country',
    'destination.city',
    'destination.country',
  ]);

  const flightResult = await flights.modelQuery.exec();

  return flightResult;
};

export const flightService = {
  createFlight,
  getAllFlights,
  getFlightById,
  deleteFlightById,
  updateFlightById,
  searchFlights,
};
