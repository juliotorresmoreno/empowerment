import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { CreateUserSchema, UpdateUserSchema } from './validations/user.joi';
import createHttpError from 'http-errors';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  showMe() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new createHttpError.NotImplemented();
  }

  @Patch()
  @UsePipes(new JoiValidationPipe(UpdateUserSchema))
  updateMe(@Body() updateUserDto: UpdateUserDto) {
    throw new createHttpError.NotImplemented();
  }

  @Delete()
  removeMe() {
    throw new createHttpError.NotImplemented();
  }
}
