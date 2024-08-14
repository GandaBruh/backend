import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { RegisterUsecase } from './usecase/register.usecase';
import { LoginUsecase } from './usecase/login.usecase';
import { LoginDTO } from './dto/logion.dto';

@Controller({ path: 'authentication' })
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(
    private readonly registerUsecase: RegisterUsecase,
    private readonly loginUsecase: LoginUsecase
  ) {}

  @Post('login')
  public async login(@Body() body: LoginDTO) {
    return this.loginUsecase.execute(body)
  }

  @Post('register')
  public async register(@Body() body: RegisterDTO) {
    return this.registerUsecase.execute(body)
  }
}
