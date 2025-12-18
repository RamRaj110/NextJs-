import { model, models, Schema, Types,  } from "mongoose";

export interface ITag{
    tag:Types.ObjectId,
    question:Types.ObjectId
 
}
const TagSchema =new Schema<ITag>({
    tag:{type:Schema.Types.ObjectId,ref:"Tag",required:true},
    question:{type:Schema.Types.ObjectId,ref:"Question",required:true},
},{
    timestamps:true
})

const Tag = models?.Tag || model<ITag>("Tag",TagSchema);

export default Tag