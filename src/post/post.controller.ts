import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'post' })
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards()
export class PostController {
  constructor() {}

  @Post('create')
  public async create() {}
}
