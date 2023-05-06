import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    try {
      return await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw new HttpException(
        'User with email does not exists',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getById(id: number) {
    try {
      return await this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    }
  }

  async create(userData: CreateUserDto) {
    const newUser = this.usersRepository.create({
      email: userData.email,
      name: userData.name,
      password: userData.password,
    });
    return await this.usersRepository.save(newUser);
  }
}
