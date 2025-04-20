"use client";

import { ReactElement } from "react";
import {Toaster} from "react-hot-toast"

export default function ToastProvider({ children , req}: {children:ReactElement,req?:{type:string,meassage:string}}) {

  return (
    <>
        <Toaster/>
        {children}
    </>
  );
}