import { Router } from 'express';

import { bookingController } from './booking.controller';

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';

const router = Router();

router
  .route('/')
  .post(
    auth('admin', 'user'),
    validateRequest(BookingValidation.createBookingSchema),
    bookingController.createBooking,
  )
  .get(auth('admin'), bookingController.getAllBookings);

router
  .route('/user')
  .post(auth('admin', 'user'), bookingController.createBooking);

router
  .route('/:id')
  .put(auth('admin'), bookingController.updateBooking)
  .delete(auth('admin'), bookingController.deleteBooking);

export const bookingRouters = router;
