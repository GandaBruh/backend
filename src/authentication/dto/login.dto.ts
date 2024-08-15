import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class LoginDTO {
  @ApiProperty({ default: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ default: "password"})
  @IsString()
  password: string;
}
