import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/common/auth';
import { AuthGuard } from 'src/common/middleware/jwt.guard';

import { UpdateUserDTO } from './dto/update.dto';
import { UpdateUserUsecase } from './usecase/update.usecase';
import { GetUserUsecase } from './usecase/get.usecase';

@Controller({ path: 'user' })
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly updateUsecase: UpdateUserUsecase,
    private readonly getUsecase: GetUserUsecase,
  ) {}

  @Post('update')
  @ApiOperation({ summary: 'Update user profile' })
  update(
    @CurrentUser() user: User,
    @Body() body: UpdateUserDTO,
  ) {
    return this.updateUsecase.execute(body, user);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get login user profile' })
  get(@CurrentUser() user: User) {
    return this.getUsecase.execute(user);
  }
}
