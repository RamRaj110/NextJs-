
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongooseCashe{
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global{
    var mongoose: MongooseCashe;
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () : Promise<Mongoose> => {
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI,{ dbName: "codequestiondb" }).then((result)=>{
            return result;
        }).catch((error)=>{
            console.log("Mongoose connection error:", error);
            throw error;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;