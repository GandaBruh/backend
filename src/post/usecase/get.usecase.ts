import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { BaseUsecase } from "src/common/interface/usecase.interface";

@Injectable()
export class GetPostUsecase extends BaseUsecase<Promise<any>>{
    
    async execute(userId?: string) {
        const post = await this.prismaSevice.post.findMany({
            where:{
                userId: Number(userId) || undefined
            },
            include:{
                user:{
                    select:{
                        name: true,
                    }
                }
            }
        })
        return post
    }

}