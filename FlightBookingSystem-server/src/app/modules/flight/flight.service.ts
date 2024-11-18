/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TFlight } from './flight.interface';
import { FlightModel } from './flight.model';
import { TSeat, TSeatInput } from '../seat/seat.interface';
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

    const seatPayload: TSeat = {
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
  const flights = await FlightModel.find({ isDeleted: { $ne: true } }).populate(
    'seats',
  );
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

const searchFlights = async (query: any) => {
  const flights = new QueryBuilder(
    FlightModel.find({ isDeleted: { $ne: true } }),
    query,
  ).search([
    'origin.city',
    'origin.country',
    'destination.city',
    'destination.country',
    'departureTime',
    'arrivalTime',
  ]);

  const flightResult = await flights.modelQuery.exec();

  return flightResult;
};

// const getAllServices = async (query: Record<string, unknown>) => {
//   const services = new QueryBuilder(
//     ServiceModel.find({ isDeleted: { $ne: true } }),
//     query,
//   )
//     .search(['name', 'description'])
//     .filter([
//       'searchTerm',
//       'sort',
//       'order',
//       'limit',
//       'page',
//       'fields',
//       'priceRange',
//     ])
//     .sort()
//     .paginate()
//     .fields();
//   const serviceResult = await services.modelQuery.exec();

//   return serviceResult;
// };
// const getAllServicesAdmin = async (query: Record<string, unknown>) => {
//   // Create the base query using the QueryBuilder
//   const services = new QueryBuilder(ServiceModel.find(), query)
//     .search(['name', 'description'])
//     .filter([
//       'searchTerm',
//       'sort',
//       'order',
//       'limit',
//       'page',
//       'fields',
//       'priceRange',
//     ])
//     .sort()
//     .paginate()
//     .fields();

//   // Execute the query to get the results
//   const serviceResult = await services.modelQuery.exec();

//   // Fetch the total count of documents without pagination filters
//   const totalCount = await ServiceModel.countDocuments(services.filterQuery);

//   // Extract pagination parameters from the query
//   const page = query.page ? parseInt(query.page as string, 10) : 1;
//   const limit = query.limit ? parseInt(query.limit as string, 10) : 10;

//   // Calculate total pages
//   const totalPages = Math.ceil(totalCount / limit);

//   // Return the result along with pagination details
//   return {
//     data: serviceResult,
//     total: totalCount,
//     currentPage: page,
//     totalPages,
//     pageSize: limit,
//   };
// };

// const getServiceById = async (id: string) => {
//   const service = await ServiceModel.findById(id);

//   // checking is service is deleted
//   if (service?.isDeleted) {
//     throw new NotFoundError(httpStatus.NOT_FOUND, 'Service is deleted!');
//   }

//   // checking is service is available
//   if (!service) {
//     throw new NotFoundError(
//       httpStatus.NOT_FOUND,
//       'Service not found!',
//       service,
//     );
//   }
//   return service;
// };

// const updateServiceById = async (id: string, payLoad: Partial<TFlight>) => {
//   const service = await ServiceModel.findByIdAndUpdate(id, payLoad, {
//     new: true,
//   });

//   // checking is service is available
//   if (!service) {
//     throw new NotFoundError(
//       httpStatus.NOT_FOUND,
//       'Service not found!',
//       service,
//     );
//   }
//   return service;
// };

// const deleteServiceById = async (id: string) => {
//   const service = await ServiceModel.findById(id);

//   // checking is service is available
//   if (service?.isDeleted || !service) {
//     throw new NotFoundError(httpStatus.NOT_FOUND, 'Service not found!');
//   }

//   const result = await ServiceModel.findByIdAndUpdate(id, { isDeleted: true });

//   return result;
// };

export const flightService = {
  createFlight,
  getAllFlights,
  getFlightById,
  deleteFlightById,
  searchFlights,

  // getAllServices,
  // getServiceById,
  // updateServiceById,
  // deleteServiceById,
  // getAllServicesAdmin,
};
