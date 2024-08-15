import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class RegisterDTO {
  @ApiProperty({ default: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ default: "password"})
  @IsString()
  password: string;

  @ApiProperty({ default: "name"})
  @IsString()
  @IsOptional()
  name?: string;
}
