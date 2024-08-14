import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@Controller({path: 'authentication'})
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(
    
  ) {}

  @Post('login')
  public async login() {

  }

  @Post('register')
  public async register() {

  }

  
}
