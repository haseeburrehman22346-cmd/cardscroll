import { NextRequest, NextResponse } from "next/server";
import Cardapi from "../../../../public/data/cardapi.json";
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const start = parseInt(searchParams.get("start") || "0");
    const limit = parseInt(searchParams.get("limit") || "21");
    const paginatedData = Cardapi.slice(start, start + limit);
    return NextResponse.json(paginatedData);
}