import { Module } from '@nestjs/common';
import { SubscribersModule } from './subscribers/subscribers.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { PostsModule } from './posts/posts.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CoreExceptionFilter } from './core/exception.filter';
import { RequestBodyValidationPipe } from './core/request-body.validation.pipe';
import { AddressesModule } from './addresses/addresses.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
      logging: ['query', 'error'],
    }),
    SubscribersModule,
    UsersModule,
    PostsModule,
    AddressesModule,
    CategoriesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CoreExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: RequestBodyValidationPipe,
    },
  ],
})
export class AppModule {}
