// import httpStatus from 'http-status';
import httpStatus from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { userService } from './auth.service';
import sendResponse from '../../../utils/sendResponse';

const signupUser = catchAsync(async (req, res) => {
  const result = await userService.signUpUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { data, token } = await userService.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: token,
    data: data,
  });
});

export const userController = { signupUser, loginUser };
