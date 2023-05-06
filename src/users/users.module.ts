import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationService } from './services/authentication.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strateg';
import { AuthenticationController } from './controllers/authentication.controller';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [UsersService, AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [UsersService, AuthenticationService, TypeOrmModule],
})
export class UsersModule {}
