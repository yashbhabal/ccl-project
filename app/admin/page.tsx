'use server'
import { IsAdmin } from "@/backend/auth"
import ToastServer from "@/components/ToastServer";
import Image from "next/image";
export default async function Page(){
    const req = await IsAdmin();
    if(!req) return <ToastServer msz="Not authorized" path="/books" type="error"/>
    return(
        <>
        <div className="flex justify-center items-center ">
            <Image src={"/dashboard.png"} width={500} height={500} alt="Dashboard"/>
        </div>
        </>
    )
}