import { GetRangeBookServerAPI } from "@/backend/serverAction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { range } = await req.json();
        if(!range || !("start" in range) || !("end" in range))
            return NextResponse.json({ data:[], status: 404, error:"provide range" }, { status: 404 });
        const {data} = await GetRangeBookServerAPI(range.start,range.end)
        return NextResponse.json({ data }, { status: 200 });
    } catch (e) {
      const error = e instanceof Error ? e.message : 'Unknown error';
      return NextResponse.json({ data:[], status: 400, error }, { status: 400 });
    }
  }