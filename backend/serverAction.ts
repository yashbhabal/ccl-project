'use server'
import { PreviewData } from "next";
import { Adamina, Carter_One } from "next/font/google";
import { AddAdressDB, DeleteAddress, GetBooksInRange, GetRecord, GetRecordGenres, OrderPlaceDB, UpdateEbookDataBase, UpdateOrderDB } from "./database";
import { verifySession } from "./session";
import { error } from "console";
import { Address, Book } from "./datatypes";
import { promise, z } from "zod";
import { permanentRedirect, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { parse } from "path";
import Cart from "@/components/User/Cart";
import { Logout } from "./auth";

import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
type address = z.infer<typeof Address>
type BookTypes = z.infer<typeof Book>
export async function AddAdressAction(formState:PreviewData,formData:FormData){
    const {session,user} = await verifySession()
    if(!session){
        return permanentRedirect('/auth')
    }
    const address:address = {
        name:formData.get('name') as string,
        address:formData.get('address') as string,
        city:formData.get("city") as string,
        phone:formData.get('phone') as string,
        pincode:parseInt(formData.get('pincode') as string),
        state:formData.get("state") as string,
        landmark:formData.get("landmark") as string,
        user_id:user
    }
    try{
        const data = await AddAdressDB(address)
        revalidatePath('/dashboard/address')
        return data;
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.message}`,success:false}; 
        return {error:"something went wrong signin",success:false}; 
    }
}
export async function AddOrderAction(formState:PreviewData,formData:FormData){
    const {user,session} = await verifySession()
    if(!session)
        return permanentRedirect('/auth')
    
    const addressId = parseInt(formData.get("address") as string) ;
    if(addressId  == -1) return {error:"select address",success:false}
    let books:{[book_id:string]:{qty:number,ebook:boolean}} = JSON.parse(formData.get("books") as string)
    const req = await OrderPlaceDB(books,user,addressId)
    return req
}

export async function DeletAddressAction(formState:PreviewData,formData:FormData){
    const {session} = await verifySession()
    if(!session){
        return permanentRedirect('/auth')
    }
    const id = formData.get("address_id") as string;
    const data = await DeleteAddress(parseInt(id))
    if(data.success){
        revalidatePath("/dashboard/address",'layout')
    }
    return data;
}

export async function LogOutAction(formData:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        const req = await Logout();
        return {error:req.error,success:req.success}
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Logout fail",success:false}
    }
}

type data = {
    id: number;
    book_id: number;
    order_id: number;
    cost: number;
    qty: number;
    status: string;
} | null;

export async function CompleteOrder(PrevState:PreviewData,FromData:FormData):Promise<{error:string,success:boolean,data:data|null}>{
    try{
        let id = FromData.get("id") as string;
        let val = FromData.get("value") as string
        const req = await UpdateOrderDB(parseInt(id),val);
        return {error:req.error,success:req.success,data:req.data}
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false,data:null}
        }
        return {error:"Logout fail",success:false,data:null}
    }
}


export async function GetReportRecord(PrevState:PreviewData,FromData:FormData){
    try{
        let year = FromData.get('year') as string;
        const Record = await GetRecord(parseInt(year))
        const generRecord = await GetRecordGenres(parseInt(year))
        return {error:``,success:true,data:{year:parseInt(year),Record:Record.data,generRecord:generRecord.data}}
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false,data:null}
        }
        return {error:"Fetching Record fail",success:false,data:null}
    }
}

export async function GetRangeBookServerAPI(start:number,limit:number):Promise<{data:BookTypes[],success:boolean}>{
    try{
        const {data} = await GetBooksInRange(start,limit);
        return {data,success:true}
    }catch(e){
        return {data:[],success:false}
    }
}



export async function DeleteEbookServer(PrevState:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        // delete this to cloud logic
        // ------------------
        // ------------------
        await new Promise((res)=>{
            setTimeout(()=>{
                res("sucesss")
            },3000)
        })
        const id = FromData.get("id") as string
        const req = await UpdateEbookDataBase(parseInt(id),false)
        // revalidatePath("/admin/ebooks","layout")
        return {error:req.error, success:req.success}
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Cloud upload fail server action",success:false}
    }
}
