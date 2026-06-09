import { RequestHandler } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';

export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
