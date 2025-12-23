import User from "@/database/user.modules";
import handleError from "@/lib/handlers/errors";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse } from "@/Types/global";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find();
        return NextResponse.json({success: true,data:users},{status:200});
        
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }
}
export async function POST(request:Request) 