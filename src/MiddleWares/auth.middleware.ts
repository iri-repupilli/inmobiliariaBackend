import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  try {
    /*Payload tiene cosas como 
      {
      id: 3,
      rol: 'ADMIN',
      iat: 123456,
      exp: 123999
      }
    */
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    //La idea del middleware es:
    // 1. Verificar el token
    // 2. guardar la info del usuario en la request para que los controladores siguientes la puedan usar
    /*Después, en cualquier controller protegido:
    const userId = req.user.id;
    const rol = req.user.rol;
    */
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
