import uploader from "@/app/config/uploader";
import { UploadApiResponse } from "cloudinary";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body = await req.formData()
    const file: File | null = body.get('image') as unknown as File
    const res = await uploader(file,"Gallery") as unknown as UploadApiResponse
    
    return NextResponse.json({message:"file"},{status:200})
}