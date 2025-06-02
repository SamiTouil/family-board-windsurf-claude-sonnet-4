import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { validateBody, validateQuery } from '../../utils/validation';

// Mock Express objects
const mockRequest = (body: any = {}, query: any = {}): Partial<Request> => ({
  body,
  query,
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext: NextFunction = jest.fn();

describe('Validation Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateBody', () => {
    const testSchema = z.object({
      name: z.string().min(1),
      age: z.number().min(0),
    });

    it('should call next() for valid body', () => {
      const req = mockRequest({ name: 'John', age: 25 });
      const res = mockResponse();
      const middleware = validateBody(testSchema);

      middleware(req as Request, res as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid body', () => {
      const req = mockRequest({ name: '', age: -1 });
      const res = mockResponse();
      const middleware = validateBody(testSchema);

      middleware(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Validation failed',
        errors: expect.any(Array),
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return detailed validation errors', () => {
      const req = mockRequest({ name: '', age: 'invalid' });
      const res = mockResponse();
      const middleware = validateBody(testSchema);

      middleware(req as Request, res as Response, mockNext);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Validation failed',
        errors: expect.arrayContaining([
          expect.stringContaining('name'),
          expect.stringContaining('age'),
        ]),
      });
    });
  });

  describe('validateQuery', () => {
    const testSchema = z.object({
      page: z.string().transform(Number).pipe(z.number().min(1)),
      limit: z.string().transform(Number).pipe(z.number().min(1).max(100)),
    });

    it('should call next() for valid query', () => {
      const req = mockRequest({}, { page: '1', limit: '10' });
      const res = mockResponse();
      const middleware = validateQuery(testSchema);

      middleware(req as Request, res as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid query', () => {
      const req = mockRequest({}, { page: '0', limit: '200' });
      const res = mockResponse();
      const middleware = validateQuery(testSchema);

      middleware(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Query validation failed',
        errors: expect.any(Array),
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
