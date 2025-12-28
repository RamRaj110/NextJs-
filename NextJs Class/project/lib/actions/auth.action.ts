'use server'
import { ActionResponse, ErrorResponse } from "@/Types/global";
import action from "../handlers/action";
import handleError from "../handlers/errors";
import { SignUpSchema } from "../validation";
import mongoose from "mongoose";
import User from "@/database/user.modules";
import Account from "@/database/account.modules";
import bcrypt from "bcryptjs";

export async function signUpWithCredentials(params:AuthCredentials):Promise<ActionResponse>{
    const validationResult = await action({params,schema:SignUpSchema as any})
    if(validationResult instanceof Error){
        return handleError(validationResult) as ErrorResponse;
    }
    if (!validationResult.params) {
        return { success: false, message: "Invalid parameters" };
    }
    const {name,username,email,password}= validationResult.params;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const existingUser = await User.findOne({email}).session(session);
        if(existingUser){
            throw new Error("User already exists with this email");
        }
        const existingUsername = await User.findOne({username}).session(session);
        if(existingUsername){
            throw new Error("Username is already taken");
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = await User.create({
            name,
            username,
            email,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
        }, {session}) as any;

        await Account.create({
            userId:newUser._id,
            name,
            provider:'credentials',
            providerAccountId:email, // Use email as providerAccountId for credentials
            password :hashedPassword,
        }, {session})
        await session.commitTransaction();
        // Note: signIn should be called from client side after successful signup
        return{success:true, message: "Account created successfully"}


    } catch (error) {
        await session.abortTransaction()
        return handleError(error) as ErrorResponse;
    }finally{
        await session.endSession();
    }

}