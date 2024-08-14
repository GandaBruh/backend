import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/common/auth';
import { AuthGuard } from 'src/common/middleware/jwt.guard';
import { CreatePostUsecase } from './usecase/create.usecase';
import { CreatePostDTO } from './dto/create.dto';

@Controller({ path: 'post' })
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly createUsecase: CreatePostUsecase) {}

  @Post('create')
  create(
    @CurrentUser() user: User,
    @Body() body: CreatePostDTO
  ) {
    return this.createUsecase.execute(body, user)
  }
}
