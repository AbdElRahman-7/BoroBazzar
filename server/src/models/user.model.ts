import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image?: string;
    phone?: string;
    role: "user" | "admin";
    otp?: string;
    otpExpires?: Date;
}




const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    otp:{
        type: String,
    },
    otpExpires:{
        type: Date,
    }
}, {
    timestamps: true,
});


export default mongoose.model<IUser>('User', userSchema);