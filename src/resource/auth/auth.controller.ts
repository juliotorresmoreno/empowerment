import { Controller, Post, Body, UsePipes, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { CreateAuthSchema } from './validations/auth.joi';
import { Authentication } from 'src/utils/authentication';
import { RequestWithUserSession } from 'src/types/as';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Authentication()
  get(@Request() req: RequestWithUserSession) {
    return req.user;
  }

  @Post()
  @UsePipes(new JoiValidationPipe(CreateAuthSchema))
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
}
