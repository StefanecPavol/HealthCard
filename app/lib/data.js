import { Message, Notification, User } from "./models"
import { connectToDB } from "./utils"

export const fetchUsers = async (q, page) => {

    const regex = new RegExp(q, "i")

    const ITEM_PER_PAGE = 2;

    try {
        connectToDB();
        const count = await User.find({username: {$regex:regex}}).count();
        const users = await User.find({username: {$regex: regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return {count, users}
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch users!")
    }
}

export const fetchUser = async (id) => {

    try {
        connectToDB();
        const user = await User.findById(id)
        return user
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch user!")
    }
}

export const fetchUserByUsername = async (username) => {

    try {
        connectToDB();
        const user = await User.findOne({username: username})
        return user
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch user!")
    }
}


export const fetchMessages = async (userId) => {
    try {
        connectToDB();
        const messages = await Message.find({userId : userId})
        return messages
    } catch (err) {
        console.log(err)
        throw new Error ("Failed to fetch user messages !")
    }
}

export const fetchNotifications = async () => {
    try {
        connectToDB();
        const notifications = await Notification.find()
        return notifications
    } catch (err) {
        console.log(err)
        throw new Error ("Failed to fetch notifications !")
    }
}