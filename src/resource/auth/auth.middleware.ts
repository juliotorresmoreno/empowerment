import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { RequestWithUserSession } from 'src/types/as';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async use(req: RequestWithUserSession, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '') ?? '';
    if (typeof token !== 'string') {
      next();
      return;
    }

    const secret = this.configService.get('secret');
    const decoded: any = jwt.verify(token, secret);
    const user = await this.userService.findOneById(decoded._id);
    req.user = user;

    next();
  }
}
