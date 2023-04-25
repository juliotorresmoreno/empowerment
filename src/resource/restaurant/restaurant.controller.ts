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
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import createHttpError from 'http-errors';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { CreateRestaurantSchema } from './validations/restaurant.joi';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateRestaurantSchema))
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    throw new createHttpError.NotImplemented();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new createHttpError.NotImplemented();
  }
}
