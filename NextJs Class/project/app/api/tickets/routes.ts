import { NextResponse } from "next/server"; 
import tickets from "@/app/database";

export async function GET() {
    return NextResponse.json(tickets);
}

export async function POST(request: Request) {
    const newTicket = await request.json();
    tickets.push({id: tickets.length + 1, ...newTicket});
    return NextResponse.json(newTicket, { status: 201 });
}

