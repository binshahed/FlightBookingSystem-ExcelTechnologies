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

const searchFlights = catchAsync(async (req, res) => {
  const result = await flightService.searchFlights(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flights retrieved successfully',
    data: result,
  });
});

// // get all services
// const getAllServices = catchAsync(async (req, res) => {
//   const result = await flightService.getAllServices(req.query);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Services retrieved successfully',
//     data: result,
//   });
// });
// // get all services
// const getAllServicesAdmin = catchAsync(async (req, res) => {
//   const result = await flightService.getAllServicesAdmin(req.query);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Services retrieved successfully',
//     data: result,
//   });
// });
// const getServiceById = catchAsync(async (req, res) => {
//   const result = await flightService.getServiceById(req.params.id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Service retrieved successfully',
//     data: result,
//   });
// });

// const updateServiceById = catchAsync(async (req, res) => {
//   const result = await flightService.updateServiceById(
//     req.params.id,
//     req.body,
//   );

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Service updated successfully',
//     data: result,
//   });
// });

// const deleteServiceById = catchAsync(async (req, res) => {
//   const result = await flightService.deleteServiceById(req.params.id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Service deleted successfully',
//     data: result,
//   });
// });

export const flightController = {
  createFlight,
  getAllFlights,
  searchFlights,
  getFlightById,
  deleteFlightById
  // getAllServices,
  // getServiceById,
  // updateServiceById,
  // deleteServiceById,
  // getAllServicesAdmin,
};
