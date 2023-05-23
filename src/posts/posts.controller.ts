import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { FindOneParams } from '../utils/find-one-params';
import JwtAuthenticationGuard from '../users/guards/jwt-auth.guard';
import { RequestWithUser } from '../users/types/request-with.user';
import { CreatePostDto } from './dto/create-post.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  getById(@Param() { id }: FindOneParams) {
    return this.postsService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }
}
