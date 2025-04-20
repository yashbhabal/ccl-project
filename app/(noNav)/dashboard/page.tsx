import { IsLogin } from "@/backend/auth";
import { accessSync } from "fs";
import Image from "next/image";
import { permanentRedirect } from "next/navigation";


const  AdminDashboard = async () => {
  await IsLogin('/auth')
  return (
    <div>
       <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <Image src={"/dashboard.png"} width={500} height={500} alt="Dashboard"/>
        </div>
    </div>
  );
};

export default AdminDashboard;
