import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FlightValidation } from './flight.validation';
import { flightController } from './flight.controller';

import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(
    auth('admin'),
    validateRequest(FlightValidation.createFlightValidation),
    flightController.createFlight,
  )
  .get(flightController.getAllFlights);

router.route('/:id').get(flightController.getFlightById).delete(auth('admin'), flightController.deleteFlightById);

router.route('/search').get(flightController.searchFlights);
//   .get(serviceController.getAllServices);

// router
//   .route('/admin')
//   .get(auth('admin'), serviceController.getAllServicesAdmin);

// router
//   .route('/:id')
//   .get(serviceController.getServiceById)
//   .patch(
//     auth('admin'),
//     validateRequest(ServiceValidation.updateServiceValidation),
//     serviceController.updateServiceById,
//   )
//   .delete(auth('admin'), serviceController.deleteServiceById);

export const flightRouter = router;
