import mongoose from "mongoose";
import { stringify } from "querystring";

export const userEntity = () => {
    let userSchema = new mongoose.Schema(
        {
            name: String,
            email: String,
            age: Number
        }
    )
    return mongoose.model('Users', userSchema);
}