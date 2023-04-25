import { Request } from 'express';
import { User } from 'src/entities/User.entity';

export type RequestWithUserSession = {
  user: User;
  token: string;
} & Request;
