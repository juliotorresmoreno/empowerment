import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import * as createHttpError from 'http-errors';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async create({ email, password }: CreateAuthDto) {
    const user = await this.userService.findOne({ email: email }, [
      ...this.userService.select,
      'password',
    ]);
    if (user && user.validatePassword(password)) {
      const payload = { _id: user.id, email: user.email };
      const secret = this.configService.get('secret');
      const token = jwt.sign(payload, secret, {
        expiresIn: '2 days',
      });

      return { token };
    } else {
      throw new createHttpError.Unauthorized('Password is not correct');
    }
  }
}
