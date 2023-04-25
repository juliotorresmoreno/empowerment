import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/User.entity';
import { FindOptionsWhere, MongoRepository, ObjectLiteral } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as createHttpError from 'http-errors';
import { MongoBulkWriteError, ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  private select: (keyof User)[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'photo_url',
    'verified',
    'creation_at',
    'updated_at',
  ];
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.phone = createUserDto.phone;
    user.password = createUserDto.password;

    return this.userRepository
      .save(user)
      .then(() => this.findOneById(user.id))
      .catch(function (err) {
        if (err.constructor === MongoBulkWriteError) {
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
    return this.userRepository.find({ select: this.select, deleted_at: null });
  }

  findOne(where: ObjectLiteral | FindOptionsWhere<User>) {
    return this.userRepository.findOne({
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
