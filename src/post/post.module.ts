import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { CreatePostUsecase } from './usecase/create.usecase';
import { UpdatePostUsecase } from './usecase/update.usecase';
import { GetPostUsecase } from './usecase/get.usecase';
import { DeletePostUsecase } from './usecase/delete.usecase';


@Module({
  imports: [],
  controllers: [PostController],
  providers: [
    CreatePostUsecase,
    UpdatePostUsecase,
    GetPostUsecase,
    DeletePostUsecase
  ],
})
export class PostModule {}
