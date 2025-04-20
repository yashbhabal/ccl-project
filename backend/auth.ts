'use server'
import { PreviewData } from "next";
import bcrypt from 'bcrypt';
import { error } from "console";
import { GetSingleUser, SignInDB, SignUpDB, ToogleAdmin } from "./database";
import { createSession, destroySession, verifySession } from "./session";
import { redirect } from "next/navigation";

export async function SignUpAction(prevState:PreviewData, formData:FormData){
    const email  = formData.get("email") as string;
    const password = formData.get("password") as string;
    const req  = await SignUpDB({email,password,admin:false})
    return req;
}

export async function SignInAction(prevState:PreviewData, formData:FormData){
    const email  = formData.get("email") as string;
    const password = formData.get("password") as string;
    try{
        const req = await SignInDB({email,password});
        if(req.success && req.id)
            await createSession(req.id,req.admin)
        console.log(req)
        return req;
    }catch(e){
        if(e instanceof Error)
            return {error:e.message,success:false};
        return {error:"Error Login in",success:false};
    }
}

export async function MakeAdmin(prevState:PreviewData, formData:FormData){
    const id = parseInt(formData.get("id") as string)
    const value = formData.get('admin') as string  === 'true' ? false : true; // reversing permission
    try{
        const req = await ToogleAdmin(id,value)
        if(req.success){
            return {error:"",success:true}
        }
        return req;
    }catch(e){
        if(e instanceof Error)
            return {error:e.message,success:false};
        return {error:"Error Login in",success:false};
    }
}

export async function IsLogin(path?:string) {
    const req = await verifySession();
    if(path && !req.session)
        redirect(path)
    return req
}
export async function IsAdmin(path:string="/books") {
    const req = await verifySession();
    return req.admin
}

export async function Logout() {
    const req = await destroySession();
    return req;
  }
  