import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { BaseUsecase } from "src/common/interface/usecase.interface";

@Injectable()
export class DeletePostUsecase extends BaseUsecase<Promise<any>> {

    async execute(id: String, user: User) {

        const numberId = Number(id)
        if(typeof numberId !== "number" || isNaN(numberId)){
            throw new BadRequestException("Something was wrong to delete post")
        }
        const post = await this.prismaSevice.post.findFirstOrThrow({
            where:{
                id: numberId,
                userId: user.id
            }
        }).catch((e) => {
            throw new NotFoundException("Post not found")
        })

        const deletePost = await this.prismaSevice.post.delete({
            where:{
                id: numberId
            }
        })

        return deletePost
    }
}