import { NextResponse } from "next/server";
import Cardapi from "../../../../public/data/cardapi.json";
export async function GET() {
    return NextResponse.json(Cardapi);
}