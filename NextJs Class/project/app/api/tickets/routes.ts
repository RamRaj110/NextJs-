import { NextResponse } from "next/server"; 
import tickets from "@/app/database";

export async function GET() {
    return NextResponse.json(tickets);
}