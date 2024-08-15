import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { BaseUsecase } from 'src/common/interface/usecase.interface';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class LoginUsecase extends BaseUsecase<Promise<any>> {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async execute(body: LoginDTO) {
    const account = await this.prismaSevice.user
      .findFirstOrThrow({
        where: {
          username: body.username,
        },
      })
      .catch((e) => {
        throw new NotFoundException('Invalid username or password');
      });

    if (account.password != body.password)
      throw new NotFoundException('Invalid username or password');

    const signOptions = {
      secret: process.env.JWT_SECRET,
      expiresIn: '1w',
    } as JwtSignOptions;

    const payload = {
      id: account.id,
    };

    const accessToken = this.jwtService.sign(payload, signOptions);

    return {
      accessToken: accessToken,
      payload: payload,
    };
  }
}
