import { NextRequest,NextResponse } from "next/server";
import prisma from "@/lib/client";
export async function GET(req:NextRequest,{params}:{params:{pageNum:string}}){
    try {
        const toNum = Number(params.pageNum)
        const photos = await prisma.image.findMany({
            take:6,
            skip:(toNum-1)*toNum,
            orderBy:{
                createdAt:"desc"
            }
        })
        if(!photos){
            return NextResponse.json({message:"Not found anything!"},{status:404})
        }
        
        return NextResponse.json({photos},{status:200})
    } catch (error:any) {
        return NextResponse.json({message:error.message,error},{status:500})
    }
}