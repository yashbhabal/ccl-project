'use server'
import {v2} from "cloudinary"
import exp from "constants";
import { Result } from "postcss";
// import "@/env"

v2.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
export async function deleteImageCloud(url:string){
    try{
        let publicId = url.split('/').slice(-2).join('/').slice(0,-4);
        const data = await v2.uploader.destroy(publicId,(result)=>{
        })
    }catch(e){
    }
}

export async function fetchRecommendations(query:string) {
    try {
        const encodedQuery = encodeURIComponent(query);
        const url = `${process.env.RECOMMENDATION_API}/recommendations?query=${encodedQuery}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return JSON.parse(data);
    } catch (error) {
        if(error instanceof Error)
            console.log({ error: error.message , status:error.name});
        else 
            console.error('Error fetching recommendations:', error);
    }
}


export async function GetDateIdForRecord(dd:boolean = true){
    const date =  new Date();
    if(dd) return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    return `${date.getMonth()+1}-${date.getFullYear()}`
}