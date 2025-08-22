import { ZodObject, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const schemaValidation =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json(error.issues.map((issue) => ({ message: issue.message })));
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
