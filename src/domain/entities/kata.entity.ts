import mongoose from "mongoose";

export const kataEntity = () => {
    let kataSchema = new mongoose.Schema(
        {
            Name: String,
            Description: String,
            Level: Number,
            User: Number,
            Chances: Number,
            Date: Date,
            Valoration: Number
        }
    )
    return mongoose.model('Katas', kataSchema);
}