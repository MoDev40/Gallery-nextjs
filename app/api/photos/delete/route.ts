import { NextRequest,NextResponse } from "next/server";
import { TypeData } from "@/app/_component/DeletePhoto";
import prisma from "@/lib/client";
import cloudinary from "@/app/config/cloudinary";

export async  function DELETE(req:NextRequest){
    try {
        const {photoId,userId,public_id} : TypeData = await req.json()
        const deletedImgFromDb = await prisma.image.delete({
            where:{
                user_Id:userId,
                id:photoId
            }
        })
        if(!deletedImgFromDb){
            return NextResponse.json({message:"Delete Failed try again"},{status:400})
        }

        const deletedImgFromCloud = await cloudinary.uploader.destroy(public_id)
        if(!deletedImgFromCloud){
            return NextResponse.json({message:"Delete Failed try again"},{status:400})
        }

        return NextResponse.json({message:"Deleted successfully"},{status:200})
    } catch (error:any) {
        return NextResponse.json({message:error.message,error},{status:500})
    }
}