import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseUsecase } from 'src/common/interface/usecase.interface';
import { RegisterDTO } from '../dto/register.dto';
import { throwError } from 'rxjs';

@Injectable()
export class RegisterUsecase extends BaseUsecase<Promise<any>> {
  async execute(body: RegisterDTO): Promise<any> {
    const exist = await this.prismaSevice.user.findUnique({
      where: {
        username: body.username.toLowerCase(),
      },
    });

    if (exist) throw new BadRequestException('username is already exist');
    const create = await this.prismaSevice.user.create({
      data: {
        username: body.username.toLowerCase(),
        password: body.password,
        name: body.name || undefined
      },
    });

    return create
  }
}
