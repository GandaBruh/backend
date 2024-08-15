import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseUsecase } from 'src/common/interface/usecase.interface';

@Injectable()
export class GetUserUsecase extends BaseUsecase<Promise<any>> {

  async execute(user: User, userId?: string) {

    const getUser = await this.prismaSevice.user.findUniqueOrThrow({
        where:{
            id: user.id
        }
    }).catch(() => {
        throw new NotFoundException("User not found")
    })

    return getUser;
  }

}
