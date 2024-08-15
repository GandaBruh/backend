import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UpdateUserUsecase } from './usecase/update.usecase';
import { GetUserUsecase } from './usecase/get.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UpdateUserUsecase, GetUserUsecase],
})
export class UserModule {}
