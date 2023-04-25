import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from 'src/entities/Food.entity';
import { FindOptionsWhere, MongoRepository, ObjectLiteral } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoBulkWriteError, ObjectId } from 'mongodb';
import * as createHttpError from 'http-errors';

@Injectable()
export class FoodService {
  private select: (keyof Food)[] = [
    'id',
    'name',
    'score',
    'keywords',
    'photo_url',
    'verified',
    'creation_at',
    'updated_at',
  ];
  constructor(
    @InjectRepository(Food)
    private restaurantRepository: MongoRepository<Food>,
  ) {}

  async create(payload: CreateFoodDto) {
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

  findOne(where: ObjectLiteral | FindOptionsWhere<Food>) {
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

  update(id: string, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: string) {
    return `This action removes a #${id} food`;
  }
}
