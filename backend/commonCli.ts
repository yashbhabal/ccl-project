'use client'

import Cart from "@/components/User/Cart";
import exp from "constants";
import { string } from "zod";

export function SetQuery([useRouter,usePathname,useSearchParams]:any,query:{[key:string]:string}){
    const params = new URLSearchParams(useSearchParams)
    Object.keys(query).forEach(key => {
        params.set(key, query[key]);
    });
    useRouter.replace(`${usePathname}?${params.toString()}`)
}

export function DeleteQuery([useRouter,usePathname,useSearchParams]:any,...value:string[]){
    const params = new URLSearchParams(useSearchParams)
    value.forEach(e=> params.delete(e))
    useRouter.replace(`${usePathname}?${params.toString()}`)
}


export function ManageCart(id:number,add:boolean,ebook:boolean = false){
    let cart:any = localStorage.getItem('cart');
    if(!cart)
        cart = {}
    else 
        cart = JSON.parse(cart);
    if(!cart[id]) cart[id] = {qty:0,ebook};
    if(add){
        ++cart[id]["qty"];
        if(ebook){
            cart[id]["qty"] = 1
            cart[id]['ebook'] = true
        }
    }else{
        --cart[id]["qty"];
        if(cart[id]["qty"] <= 0 || ebook)
            delete cart[id]
    }
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function GetBooks():number[]{
    let cart:any = localStorage?.getItem('cart')
    cart = Object.keys(JSON.parse(cart ? cart : "{}")) 
    
    let res:number[] = cart.map((e: string)=>parseInt(e))
    return res;
}
export function GetBookDic():{[key:number]:{qty:number,ebook:boolean}}{
    let cart:any
    cart = localStorage.getItem('cart')
    if(cart)
        return JSON.parse(cart) as {[key:string]:{qty:number,ebook:boolean}};
    return {};
}

export function ChangeEbookType(id: number, ebook: boolean) {
    let cart: any = localStorage.getItem('cart');
    if (!cart) {
        cart = {}; // Initialize cart if it's null or undefined
    } else {
        cart = JSON.parse(cart);
    }

    // Ensure the id exists in the cart
    if (!cart[id]) {
        cart[id] = { qty: 0, ebook: false }; // Initialize the id with default values
    }

    // Set the ebook property
    cart[id]['ebook'] = ebook;

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}



export async function StartRazorPayment({total,order_id,handleSuccess}:{total:number,order_id:string,handleSuccess:Function}){
    try{
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            currency: "INR",
            order_id: order_id,
            handler:handleSuccess,
            theme: {
                color: "#3399cc"
            },
        };
        const rzp = await new (window as any).Razorpay(options);
        rzp.open();
    } catch (e) {
      const error = e instanceof Error ? e.message : 'Unknown error';
    } 
}

export  const Months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]  

export const Genres = [
    "Comedy","Fantasy","Horror","Mystery","Romance","Science","Science Fiction","Thriller","Self-help"
]
export function getQueryParam(param:string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param); 
}

export const ebookFonts = [
    "Arial",
    "Verdana",
    "Courier New",
    "Trebuchet MS",
    "Roboto",   
];
export const computeSHA256 = async (file: File):Promise<string> => {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    return hashHex
}

