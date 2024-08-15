import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseUsecase } from 'src/common/interface/usecase.interface';
import { UpdateUserDTO } from '../dto/update.dto';
import { User } from '@prisma/client';

@Injectable()
export class UpdateUserUsecase extends BaseUsecase<Promise<any>> {
  async execute(body: UpdateUserDTO, user: User) {
   
    const userExist = await this.prismaSevice.user
      .findFirstOrThrow({
        where: {
          id: user.id,
        },
      })
      .catch((e) => {
        throw new NotFoundException('User not found');
      });

    const update = await this.prismaSevice.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: body.password,
        name: body.name || undefined
      },
    });
    return update;
  }
}
