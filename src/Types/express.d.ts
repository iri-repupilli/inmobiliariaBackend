import { JwtPayload } from 'jsonwebtoken';

// Extender la interfaz Request para incluir la propiedad 'user'
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | any;
    }
  }
}
