/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { permanentRedirect, redirect} from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
export default function ToastServer({path,type,msz}:{path:string,type:string,msz:string}) {
    useEffect(()=>{
        switch(type){
            case 'error':
                toast.error(msz)
                break;
            case 'success':
                toast.success(msz)
                break;
            default:
                toast.success(msz)
                break;
        }
        return permanentRedirect(path)
    },[])
    return null;
}
