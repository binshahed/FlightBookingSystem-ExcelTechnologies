/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TUser } from './auth.interface';
import { UserModel } from './auth.model';

const signUpUser = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Destructure user to omit password

  const userWithoutPassword = JSON.parse(JSON.stringify(user));
  if (user) {
    delete userWithoutPassword.password;
    delete userWithoutPassword.__v;
  }

  const token = jwt.sign(
    {
      data: user,
    },
    config.jwtSecret as string,
    { expiresIn: '1d' },
  );

  return {
    token: token,
    data: userWithoutPassword,
  };
};

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Destructure user to omit password

  const userWithoutPassword = JSON.parse(JSON.stringify(user));
  if (user) {
    delete userWithoutPassword.password;
    delete userWithoutPassword.__v;
  }

  const token = jwt.sign(
    {
      data: user,
    },
    config.jwtSecret as string,
    { expiresIn: '1d' },
  );

  return {
    token: token,
    data: userWithoutPassword,
  };
};

const updateProfile = async (userId: any, payload: TUser) => {
  const user = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const userService = {
  signUpUser,
  loginUser,
  updateProfile,
};
