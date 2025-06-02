import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ApiResponse } from '@/types';

export const validateBody = <T>(schema: z.ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const response: ApiResponse = {
          success: false,
          message: 'Validation failed',
          errors: error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
        };
        res.status(400).json(response);
        return;
      }
      next(error);
    }
  };
};

export const validateQuery = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.query);
      req.query = validatedData as never;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const response: ApiResponse = {
          success: false,
          message: 'Query validation failed',
          errors: error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
        };
        res.status(400).json(response);
        return;
      }
      next(error);
    }
  };
};
