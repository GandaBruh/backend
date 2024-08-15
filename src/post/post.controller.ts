import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/common/auth';
import { AuthGuard } from 'src/common/middleware/jwt.guard';
import { CreatePostUsecase } from './usecase/create.usecase';
import { CreatePostDTO } from './dto/create.dto';
import { UpdatePostDTO } from './dto/update.dto';
import { UpdatePostUsecase } from './usecase/update.usecase';
import { GetPostUsecase } from './usecase/get.usecase';
import { DeletePostUsecase } from './usecase/delete.usecase';

@Controller({ path: 'post' })
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PostController {
  constructor(
    private readonly createUsecase: CreatePostUsecase,
    private readonly updateUsecase: UpdatePostUsecase,
    private readonly getUsecase: GetPostUsecase,
    private readonly deleteUsecase: DeletePostUsecase
  ) {}

  @Post('create')
  create(
    @CurrentUser() user: User,
    @Body() body: CreatePostDTO
  ) {
    return this.createUsecase.execute(body, user)
  }

  @Post("update/:id")
  update(
    @CurrentUser() user: User,
    @Body() body: UpdatePostDTO,
    @Param('id') id: String
  ) {
    return this.updateUsecase.execute(body, user, id)
  }

  @Get("get")
  get(

  ){
    return this.getUsecase.execute()
  }

  @Get("get/user/:userId")
  getByUser(
    @Param('userId') userId: string
  ){
    return this.getUsecase.execute(userId)
  }

  @Delete("delete/:id")
  deletePost(
    @Param('id') id: string,
    @CurrentUser() user: User
  ){
    return this.deleteUsecase.execute(id, user)
  }

}
