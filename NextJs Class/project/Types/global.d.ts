import { NextResponse } from "next/server";
import { Action } from "sonner";

interface Author{
    id: number;
    name: string;
    image?: string;
}

interface Tag{
    id: number;
    name: string;
}

interface Question{
    id: string;
    title: string;
    content: string;
    description: string;
    tags: Tag[] ;
    author:Author;
    upvotes: number;
    answers: number;
    views: number;
    createdAt: string;
}

interface ActionResponse<T = null> {
    success: boolean;
    data?: T;
    message?: string;
}

type SuccessResponse<T = null> = ActionResponse<T> & {
    success: true;
}
type ErrorResponse = ActionResponse<undefined> & { success: false; 
}

type APIErrorResponse = NextResponse<ErrorResponse>
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>


interface RouteParams{
    params:Promise<Record<string,string>>;
    searchParams:Promise<Record<string,string>>;

}