import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/types';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', error);

  const isDev = process.env['NODE_ENV'] === 'development';
  const response: ApiResponse = {
    success: false,
    message: isDev ? error.message : 'Internal server error',
  };

  res.status(500).json(response);
};

export const notFoundHandler = (
  _req: Request,
  res: Response
): void => {
  const response: ApiResponse = {
    success: false,
    message: `Route ${_req.originalUrl} not found`,
  };

  res.status(404).json(response);
};
