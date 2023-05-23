import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { RegisterDto } from '../dto/register-user.dto';
import { LocalAuthenticationGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from '../types/request-with.user';
import { Response } from 'express';

@Controller('authentication')
// response interceptor
@UseInterceptors(ClassSerializerInterceptor)
// serialize entity
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return await this.authenticationService.register(registrationData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const token = await this.authenticationService.createToken({
      id: user.id,
      email: user.email,
      password: user.password,
    });
    // request.res instead res -> advice from creator
    request.res.setHeader('x-token', token);
    return user;
  }
}
