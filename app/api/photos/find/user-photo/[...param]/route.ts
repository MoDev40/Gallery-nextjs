import prisma from "@/lib/client";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{param:string[]}}){
    try {
        const [id,pageNum]  = params.param
        const toNum : number = Number(pageNum) 
        const photos = await prisma.image.findMany({
            skip:(toNum-1)*toNum,
            take:5,
            orderBy:{
                createdAt:"desc"
            },
            where:{
                user_Id:id
            }
        })
        return NextResponse.json({photos},{status:200})
    } catch (error:any) {
        return NextResponse.json({message:error.message,error},{status:500})
    }
}