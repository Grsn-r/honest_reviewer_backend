import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    title:{
        type: String,
        required: true,
        minlength: 10,
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
    picture:{
        type: String,
        required: false,
    }
}, 
{timestamps: true,});

export default mongoose.model('review', reviewSchema);