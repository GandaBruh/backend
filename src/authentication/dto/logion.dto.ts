import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDTO {
  @ApiProperty({ default: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ default: "password"})
  @IsString()
  password: string;
}
