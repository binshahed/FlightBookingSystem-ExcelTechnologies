import { Router } from 'express';

import { UserValidation } from './auth.validation';
import { userController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

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

router
  .route('/user/updateProfile')
  .patch(auth('user', 'admin'), userController.updateProfile);

export const authRoutes = router;
