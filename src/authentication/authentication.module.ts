import { Module, Provider } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { JwtService } from '@nestjs/jwt';
import { LoginUsecase } from './usecase/login.usecase';
import { RegisterUsecase } from './usecase/register.usecase';

@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: ([JwtService] as unknown as Provider[])
  .concat(
    LoginUsecase,
    RegisterUsecase
  ),
})
export class AuthenticationModule {}
