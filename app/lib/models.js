import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20,
    },
    nameAndSurname: {
        type:String,
        required:true,
    },
    gender: {
        type:String,
        required:true,
    },
    diagnosis: {
        type:String,
        default: null,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    identificationNumber: {
        type:String,
        unique: true,
    },
    img: {
        type:String,
    },
    isAdmin: {
        type:Boolean,
        default:false,
    },
    phone: {
        type:String
    },
    address:{
        type:String
    },
}, {timestamps: true}
);

const messageSchema = new mongoose.Schema({
    subject: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    userId: {
        type:String,
        required:true,
    },
}, {timestamps: true}
);

const notificationSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    category: {
        type:String,
    }
}, {timestamps: true}

);


export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);