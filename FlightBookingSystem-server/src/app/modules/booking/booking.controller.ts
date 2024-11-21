import httpStatus from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { bookingService } from './booking.service';

// create a new service
const createBooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBooking(req.body, req.user?._id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const result = await bookingService.getUserBookings(req.user?._id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingService.getAllBookings(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const result = await bookingService.updateBooking(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const result = await bookingService.deleteBooking(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking deleted successfully',
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const result = await bookingService.getMyBookings(req.user?._id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My bookings retrieved successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getMyBookings,
};
