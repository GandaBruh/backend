import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { CreatePostUsecase } from './usecase/create.usecase';


@Module({
  imports: [],
  controllers: [PostController],
  providers: [CreatePostUsecase],
})
export class PostModule {}
