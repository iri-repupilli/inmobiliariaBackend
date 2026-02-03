import { NextFunction, Request, Response } from 'express';

const multerMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('ERROR MULTER:', err);
  return res.status(500).json({
    message: 'Error en upload middleware',
    error: err.message,
  });
};

export { multerMiddleware };
