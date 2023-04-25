import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const user = await this.userService.findOne({ email: createAuthDto.email });
    if (user) {
      const payload = { _id: user.id, email: user.email };
      const secret = this.configService.get('secret');
      const token = jwt.sign(payload, secret, {
        expiresIn: '2 days',
      });

      return { token };
    } else {
      throw new Error('Password is not correct');
    }
  }
}
