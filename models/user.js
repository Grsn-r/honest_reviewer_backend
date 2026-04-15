import mongoose, { Schema } from "mongoose";
import validator from 'validator';

const userSchema = new Schema({
    name:{
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'intriduce un email',
        },
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    bio:{
        type: String,
        maxlength: 300,
        default: 'pon algo sobre ti, un chisme puede ser',
    },
},
{timestamps: true,});



export default mongoose.model('user', userSchema);