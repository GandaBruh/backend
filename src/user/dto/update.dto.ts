import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ default: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ default: 'name' })
  @IsString()
  @IsOptional()
  name: string;
}
