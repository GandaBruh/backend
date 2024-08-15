import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { RegisterUsecase } from './usecase/register.usecase';
import { LoginUsecase } from './usecase/login.usecase';
import { LoginDTO } from './dto/login.dto';

@Controller({ path: 'authentication' })
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(
    private readonly registerUsecase: RegisterUsecase,
    private readonly loginUsecase: LoginUsecase,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with username and password' })
  login(@Body() body: LoginDTO) {
    return this.loginUsecase.execute(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  register(@Body() body: RegisterDTO) {
    return this.registerUsecase.execute(body);
  }
}
