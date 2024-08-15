import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Create post' })
  create(
    @CurrentUser() user: User,
    @Body() body: CreatePostDTO
  ) {
    return this.createUsecase.execute(body, user)
  }

  @Post("update/:id")
  @ApiOperation({ summary: 'Update post by id and own user login' })
  update(
    @CurrentUser() user: User,
    @Body() body: UpdatePostDTO,
    @Param('id') id: String
  ) {
    return this.updateUsecase.execute(body, user, id)
  }

  @Get("get")
  @ApiOperation({ summary: 'Get all post' })
  get(

  ){
    return this.getUsecase.execute()
  }

  @Get("get/user/:userId")
  @ApiOperation({ summary: 'Get post by user id' })
  getByUser(
    @Param('userId') userId: string
  ){
    return this.getUsecase.execute(userId)
  }

  @Delete("delete/:id")
  @ApiOperation({ summary: 'Delete post with id and own user login' })
  deletePost(
    @Param('id') id: string,
    @CurrentUser() user: User
  ){
    return this.deleteUsecase.execute(id, user)
  }

}
