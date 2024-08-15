import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseUsecase } from "src/common/interface/usecase.interface";
import { UpdatePostDTO } from "../dto/update.dto";
import { User } from "@prisma/client";

@Injectable()
export class UpdatePostUsecase extends BaseUsecase<Promise<any>> {

  async execute(body: UpdatePostDTO, user: User, id: String) {
    const numberId = Number(id)
    if (typeof numberId !== "number" || isNaN(numberId)){
      throw new BadRequestException("Something was wrong to update")
    }

    const post = await this.prismaSevice.post.findFirstOrThrow({
      where:{
        id:numberId,
        userId: user.id
      }
    }).catch((e) => {
      throw new NotFoundException("Post not found")
    })

    const update = await this.prismaSevice.post.update({
      where:{
        id: numberId
      },
      data:{
        title: body.title,
        content: body.content
      }
    })
    
    return update
  }
}