import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import config from '../config';
import AuthorizationError from '../errors/AuthorizationError';
import { TUserRole } from '../modules/auth/auth.interface';
import { UserModel } from '../modules/auth/auth.model';

const extractToken = (
  authorizationHeader: string | undefined,
): string | null => {
  if (!authorizationHeader) return null;
  const parts = authorizationHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  return parts[1].trim();
};

const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, config.jwtSecret as Secret) as JwtPayload;
  } catch (error) {
    return null;
  }
};

const auth = (...allowedRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req.headers.authorization);

    if (!token) {
      throw new AuthorizationError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      throw new AuthorizationError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }

    const user = await UserModel.findById(decodedToken?.data?._id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'Invalid token');
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      throw new AuthorizationError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    // Attach user to request object for future use
    req.user = user;

    next();
  });
};

export default auth;
