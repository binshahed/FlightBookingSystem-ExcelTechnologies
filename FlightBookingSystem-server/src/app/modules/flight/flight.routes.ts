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

router.route('/search').get(flightController.searchFlights);

router
  .route('/:id')
  .get(flightController.getFlightById)
  .delete(auth('admin'), flightController.deleteFlightById)
  .patch(
    auth('admin'),
    validateRequest(FlightValidation.updateFlightValidation),
    flightController.updateFlightById,
  );

export const flightRouter = router;
