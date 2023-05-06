import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { RegisterDto } from '../dto/register-user.dto';
import { LocalAuthenticationGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from '../types/request-with.user';
import { Response } from 'express';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return await this.authenticationService.register(registrationData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const token = await this.authenticationService.createToken({
      id: user.id,
      email: user.email,
      password: user.password,
    });
    response.setHeader('x-token', token);
    user.password = undefined;
    return response.send(user);
  }
}
