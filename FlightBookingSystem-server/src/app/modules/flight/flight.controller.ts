import httpStatus from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { flightService } from './flight.service';

// create a new service
const createFlight = catchAsync(async (req, res) => {
  const result = await flightService.createFlight(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flight created successfully',
    data: result,
  });
});

const getAllFlights = catchAsync(async (req, res) => {
  const result = await flightService.getAllFlights();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flight retrieved successfully',
    data: result,
  });
});

const getFlightById = catchAsync(async (req, res) => {
  const result = await flightService.getFlightById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flight retrieved successfully',
    data: result,
  });
});
const deleteFlightById = catchAsync(async (req, res) => {
  const result = await flightService.deleteFlightById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flight Deleted successfully',
    data: result,
  });
});

const updateFlightById = catchAsync(async (req, res) => {
  const result = await flightService.updateFlightById(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flight updated successfully',
    data: result,
  });
});

const searchFlights = catchAsync(async (req, res) => {
 
;
  
  
  const result = await flightService.searchFlights(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flights retrieved successfully',
    data: result,
  });
});

export const flightController = {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlightById,
  deleteFlightById,
  searchFlights,
};
