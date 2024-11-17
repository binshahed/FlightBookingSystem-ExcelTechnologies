import { Router } from 'express';

import { UserValidation } from './auth.validation';
import { userController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router
  .route('/register')
  .post(
    validateRequest(UserValidation.createUserValidationSchema),
    userController.signupUser,
  );

router
  .route('/login')
  .post(
    validateRequest(UserValidation.loginValidationSchema),
    userController.loginUser,
  );

export const authRoutes = router;
