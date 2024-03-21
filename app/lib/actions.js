"use server"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Message, Notification, User } from "./models";
import { connectToDB } from "./utils";
import bcrypt from "bcrypt"
import { signIn } from "../auth";

export const addUser = async (formData) => {
    const {username, email, password, phone, address, isAdmin, nameAndSurname, gender, identificationNumber, diagnosis } = Object.fromEntries(formData);

    try {
        connectToDB();

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User( {
            username, 
            email, 
            password: hashedPassword, 
            phone, 
            address, 
            isAdmin, 
            nameAndSurname, 
            gender, 
            identificationNumber,
            diagnosis
        })

        await newUser.save();


    } catch(err) {
        console.log(err)
        throw new Error("Failed to create user!")
    }

    revalidatePath("/healthcard/users")
    redirect("/healthcard/users")
}

export const updateUser = async (formData) => {
    const {id, 
        username, 
        email, 
        password, 
        phone, 
        address, 
        isAdmin, 
        nameAndSurname, 
        gender, 
        identificationNumber,
        diagnosis} = Object.fromEntries(formData);

    try {
        connectToDB();

        const updateFields = {
            username, 
            email, 
            password, 
            phone, 
            address, 
            isAdmin, 
            nameAndSurname, 
            gender, 
            identificationNumber,
            diagnosis
        }

        Object.keys(updateFields).forEach((key) =>(updateFields[key] === "" || undefined) && delete updateFields[key]);

        await User.findByIdAndUpdate(id, updateFields);
        

    } catch(err) {
        console.log(err)
        throw new Error("Failed to update user!")
    }

    revalidatePath("/healthcard/users")
    redirect(`/healthcard/users/`)
}

export const deleteUser = async (formData) => {
    
    const {id} = Object.fromEntries(formData);
    
    try {
        connectToDB();

        await User.findByIdAndDelete(id)
        

    } catch(err) {
        console.log(err)
        throw new Error("Failed to delete user!")
    }

    revalidatePath("/healthcard/users")
}


export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { username, password });
    } catch (err) {
      if (err.message.includes("CredentialsSignin")) {
        return "Nesprávne meno alebo heslo";
      }
      throw err;
    }
  };



  export const addMessage = async (formData) => {

    const {subject, description, userId} = Object.fromEntries(formData);

    try {
        connectToDB();

        const newMessage = new Message( {
            subject, 
            description, 
            userId
        })

        await newMessage.save();
        console.log("Succesfully")

    } catch(err) {
        console.log(err)
        throw new Error("Failed to create message!")
    }

    revalidatePath(`/healthcard/messages/${userId}`)
}

export const deleteMessage = async (formData) => {
    
    console.log(formData)
    const {id} = Object.fromEntries(formData);
    const {userId} = Object.fromEntries(formData);
    
    try {
        connectToDB();

        await Message.findByIdAndDelete(id)
        

    } catch(err) {
        console.log(err)
        throw new Error("Failed to delete message!")
    }

    revalidatePath(`/healthcard/messages/${userId}`)
}

export const addNotification = async (formData) => {

    const {title, description, category} = Object.fromEntries(formData);

    try {
        connectToDB();

        const newNotification = new Notification( {
            title, 
            description, 
            category
        })

        await newNotification.save();
        console.log("Succesfully")

    } catch(err) {
        console.log(err)
        throw new Error("Failed to create notification!")
    }

    revalidatePath(`/healthcard/notifications`)
    revalidatePath(`/healthcard/notifications/add`)
}

export const deleteNotification = async (formData) => {
    

    const {id} = Object.fromEntries(formData);
    
    try {
        connectToDB();

        await Notification.findByIdAndDelete(id)
        

    } catch(err) {
        console.log(err)
        throw new Error("Failed to delete notification!")
    }

    revalidatePath(`/healthcard/notification`)
    revalidatePath(`/healthcard/notification/add`)
}