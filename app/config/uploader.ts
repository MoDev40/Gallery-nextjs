import v2 from "@/app/config/cloudinary"

const uploader = async(file :File,folder:string)=>{
    return new Promise(async (resolve,reject)=>{
        
    const buffer = await file.arrayBuffer()
    const bytes = Buffer.from(buffer)

    v2.uploader.upload_stream({
        resource_type:"image",
        folder:folder,
    },(error,result)=>{
        if(error){
            reject(error.message)
        }else{
            resolve(result)
        }
    }).end(bytes)
})
}

export default uploader