// src/users/service/jwt-middleware-consume.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    console.log('[MIDDLEWARE] Token no header Authorization:', token);
    next();
  }
}
