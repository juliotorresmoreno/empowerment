import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/entities/Restaurant.entity';
import { FindOptionsWhere, MongoRepository, ObjectLiteral } from 'typeorm';
import { MongoBulkWriteError, ObjectId } from 'mongodb';
import * as createHttpError from 'http-errors';

@Injectable()
export class RestaurantService {
  private select: (keyof Restaurant)[] = [
    'id',
    'name',
    'email',
    'score',
    'keywords',
    'photo_url',
    'verified',
    'creation_at',
    'updated_at',
  ];
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: MongoRepository<Restaurant>,
  ) {}

  async create(payload: CreateRestaurantDto) {
    return this.restaurantRepository
      .save({
        ...payload,
        score: 0.2,
        verified: true,
      })
      .then((result) => {
        console.log(result);

        this.findOneById(result.id);
      })
      .catch(function (err) {
        if (err.constructor === MongoBulkWriteError) {
          console.log('err', err);
          switch (err.code) {
            case 11000:
              const dup = err.message.split('key: ')[1] || '{}';
              const value: string = eval(dup);
              throw createHttpError.BadRequest(`${value} ya existe`);
            default:
              throw createHttpError.BadRequest();
          }
        }
      });
  }

  findAll() {
    return this.restaurantRepository.find({
      select: this.select,
      deleted_at: null,
    });
  }

  findOne(where: ObjectLiteral | FindOptionsWhere<Restaurant>) {
    return this.restaurantRepository.findOne({
      where: { ...where, deleted_at: null },
      select: this.select,
    });
  }

  findOneById(id: string);
  findOneById(id: ObjectId);
  findOneById(id: any) {
    const _id = typeof id === 'string' ? new ObjectId(id) : id;

    return this.findOne({ _id: _id });
  }

  update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: string) {
    return `This action removes a #${id} restaurant`;
  }
}
