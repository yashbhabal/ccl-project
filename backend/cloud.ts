
'use server'
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IsAdmin } from "./auth";
import { UpdateEbookDataBase } from "./database";
import { revalidatePath } from "next/cache";




const bucketName = process.env.AWS_BUCKET_NAME!
const region = process.env.AWS_BUCKET_REGION!
const accessKeyId = process.env.AWS_ACCESS_KEY!
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})
export async function AWSUpload(fileType:string,fileSize:number,checksum:string,id:number):Promise<{error:string,success:boolean,data:string}>{
    try{ 
        ////type -> application/epub+zip
        // if(fileType != "application/epub+zip"){
        //     return {error:"", success:false,data:"File must be .epub"}
        // }
        const isadmin = await IsAdmin()
        if(!isadmin)
            return {error:"you don't have permission to do that", success:false,data:""}
            
        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${id}.epub`,
            ContentType: fileType,
            ContentLength: fileSize,
            ChecksumSHA256: checksum,
        })
        const url = await getSignedUrl(s3Client,putObjectCommand,{
            expiresIn:60*5
        })
        await UpdateEbookDataBase(id,true)
        revalidatePath('/admin/ebooks');
        return {error:"", success:true,data:url}
    }catch(e){
        let meassage = "";
        (e instanceof Error) ? meassage=e.message : "Some error occured while uploading";
        return {error:meassage,success:false,data:""}
    }
}

export async function AWSDelete(id:number):Promise<{error:string,success:boolean}>{
    try{
        const isadmin = await IsAdmin()
        if(!isadmin)
            return {error:"you don't have permission to do that", success:false}

        const DeleteParam = {
            Bucket: bucketName,
            Key:`${id}.epub`,
        }
        const res = await s3Client.send(new DeleteObjectCommand(DeleteParam))
        await UpdateEbookDataBase(id,false);
        revalidatePath('/admin/ebooks');
        return {error:"",success:true}  
    }catch(e){
        let meassage = "";
        (e instanceof Error) ? meassage=e.message : "Some error occured while uploading";
        return {error:meassage,success:false}
    }
}

export async function AWSGet(id:number,validity=3600):Promise<{error:string,success:boolean,data:string}>{
    try{
        const GetParams = {
            Bucket: bucketName,
            Key:`${id}.epub`,
        }
        const command = new GetObjectCommand(GetParams);
        const url = await getSignedUrl(s3Client, command, { expiresIn: validity });
        return {error:"",success:true,data:url}
    }catch(e){
        let meassage = "";
        (e instanceof Error) ? meassage=e.message : "Some error occured while uploading";
        return {error:meassage,success:false,data:""}
    }
}