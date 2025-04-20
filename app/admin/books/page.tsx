import { IsAdmin, IsLogin } from "@/backend/auth";
import { deleteImageCloud } from "@/backend/common";
import { GetAllBooks } from "@/backend/database"
import AddNewBook from "@/components/AddNewBook"
import BooksTables from "@/components/BooksTables"
import EditBook from "@/components/EditBook";
import SerachBar from "@/components/SerachBar";
import { permanentRedirect, redirect } from "next/navigation";
export default async function Page({searchParams}:{
    searchParams?:{
        search?:string,
        page?:string,
        mode?:string,
        id?:string,
        deleteImg?:string
    }
}){     
    const req = await IsAdmin();
    if(!req) return permanentRedirect("/auth")
    const {data} = await GetAllBooks(searchParams?.search ?? '');
    if(searchParams?.deleteImg){
        await deleteImageCloud(searchParams.deleteImg)
    }
    return(
        <>
            <div className="h-fit">
                <div className="flex flex-grow justify-center items-center">
                    <AddNewBook/>
                    <SerachBar/>
                </div>
                {searchParams?.mode && <EditBook />}
                <BooksTables data={data} />
            </div>
        </>
    )
}