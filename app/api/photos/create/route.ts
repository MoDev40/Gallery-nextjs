import cloudinary from "@/app/config/cloudinary";
import uploader from "@/app/config/uploader";
import prisma from "@/lib/client";
import { UploadApiResponse } from "cloudinary";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const body = await req.formData()
        const file: File | null = body.get('image') as unknown as File
        const res = await uploader(file,"Gallery") as unknown as UploadApiResponse
        const userId = body.get('userId')
        
        const storedImg = await prisma.image.create({
            data:{
                user_Id:userId as string,
                public_id:res.public_id,
                url:res.url,
                secure_url:res.secure_url,
                resource_type:res.resource_type
            }
        }) 
        
        if(!storedImg){
            await cloudinary.uploader.destroy(res.public_id)
            return NextResponse.json({message:"Upload Failed"},{status:400})
        }
        
        return NextResponse.json({message:"Upload successfully"},{status:201})
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
        
    }
}