import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/auth';
import { ApiResponse } from '@/types';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    const response: ApiResponse = {
      success: false,
      message: 'Access token is required',
    };
    res.status(401).json(response);
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: 'Invalid or expired token',
    };
    res.status(401).json(response);
  }
};
