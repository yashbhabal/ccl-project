import { GetTotalBookForRazor } from "@/backend/database";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_ID!,
  key_secret: process.env.RAZORPAY_KEY!
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const reqData = await GetTotalBookForRazor(body)
  if(!reqData.success || !reqData.data){
    return NextResponse.json({ orderId: null, status: 400, error:"Something went wrong" }, { status: 400 });
  }
  try {
    const order = await razor.orders.create({
      amount: reqData.data * 100, // Amount in paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7)
    });
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ orderId: null, status: 400, error }, { status: 400 });
  }
}
