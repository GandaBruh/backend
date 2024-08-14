import { Injectable } from "@nestjs/common";
import { BaseUsecase } from "src/common/interface/usecase.interface";
import { CreatePostDTO } from "../dto/create.dto";

@Injectable()
export class CreateUsecase extends BaseUsecase<Promise<any>> {
  async execute(body: CreatePostDTO) {
    const create = this.prismaSevice.post.create({
      data:{
        title: body.title,
        content: body.content,
      }
    })
  }
}