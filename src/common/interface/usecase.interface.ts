import { PrismaService as prisma } from 'src/common/services/prisma.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class BaseUsecase<T>  {
  get prismaSevice() {
    return prisma;
  }
}
