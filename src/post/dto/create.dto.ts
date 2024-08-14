import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePostDTO {
  @ApiProperty({default: "title"})
  @IsString()
  title: string;

  @ApiProperty({default: "content"})
  @IsString()
  content: string;
}