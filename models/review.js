import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    title:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    text:{
        type: String,
        required: true,
        maxlength: 400,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    dislikes:[{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    comments:[
        {
            author: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
            text: {
            type: String,
            required: true,
            maxlegth: 200,
        },
            createdAt:{
            type: Date,
            default: Date.now,
        }
        },
    ],
   image: {
    url: {
    type: String,
    default: null,
     },
    publicId: {
    type: String,
    default: null,
    },
    },
}, 
{timestamps: true,});

export default mongoose.model('review', reviewSchema);