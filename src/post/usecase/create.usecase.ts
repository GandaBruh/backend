import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseUsecase } from 'src/common/interface/usecase.interface';
import { CreatePostDTO } from '../dto/create.dto';
import { User } from '@prisma/client';

@Injectable()
export class CreatePostUsecase extends BaseUsecase<Promise<any>> {
  async execute(body: CreatePostDTO, user: User) {

    const userExist = this.prismaSevice.user.findFirstOrThrow({
      where:{
        id: user.id
      }
    }).catch((e) => {
      throw new NotFoundException("User not found")
    })

    const create = this.prismaSevice.post.create({
      data: {
        title: body.title,
        content: body.content,
        userId: user.id
      }
    });

    return create
  }
}
