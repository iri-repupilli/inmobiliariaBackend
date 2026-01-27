import { Response, Request, NextFunction } from 'express';
import { Jwt } from 'jsonwebtoken';

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = req.user as Jwt & { rol: string };

  if (user.rol !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Acceso denegado: solo administradores' });
  }
  next();
}
