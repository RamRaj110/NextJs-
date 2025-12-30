interface SignWithOAuthParams {
    provider: 'github' | 'google' ,
    providerAccountId: string,
    user:{
        email:string
        name:string,
        image:string,
        username:string
    }
}

interface AuthCredentials {
    name:string,
    username:string,
    email:string,
    password:string,
}

type IUserDoc = {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
}

type IAccountDoc = {
    userId: string;
    name: string;
    provider: string;
    providerAccountId: string;
    password?: string;
}

export interface CreateQuestionParams{
    title:string;
    content:string;
    tags:string[];
}