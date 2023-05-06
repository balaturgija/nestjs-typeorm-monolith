import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from '../types/token-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationData: RegisterDto) {
    try {
      const hashPassword = await bcrypt.hash(registrationData.password, 10);
      registrationData.password = hashPassword;
      const createdUser = await this.usersService.create(registrationData);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createToken(tokenPayload: TokenPayload) {
    return await this.jwtService.signAsync(tokenPayload);
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
