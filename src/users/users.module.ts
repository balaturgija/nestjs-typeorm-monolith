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
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    ConfigModule,
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
