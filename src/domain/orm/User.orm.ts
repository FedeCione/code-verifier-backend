import { userEntity } from "../entities/user.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

// Environment Variables
import dotenv from 'dotenv';

// BCRYPT for passwords
import bcrypt from 'bcrypt';

// JWT
import jwt from 'jsonwebtoken';

// Configuration of environment variables
dotenv.config();

// Obtain secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY';

// CRUD

/**
 * Method to obtain all users from collection "Users" in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        // Search all users
        return await userModel.find({isDelete: false})
    } catch (error) {
        LogError(`[ORM ERROR]: Getting all Users: ${error}`);
    }
}

// - Get User by ID
export const getUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Search User by ID
        return await userModel.findById(id);
    } catch (error) {
        LogError(`[ORM ERROR]: Getting user by ID: ${error}`);
    }
}

// - Delete User by ID
export const deleteUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Delete user by ID
        return await userModel.deleteOne({_id: id});

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting user by ID: ${error}`);
    }
}

// - Create New User
export const createUser = async (user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Create / Insert new user
        return await userModel.create(user);

    } catch (error) {
        LogError(`[ORM ERROR]: Creating user: ${error}`);
    }
}

// - Update User by ID
export const updateUserById = async (id: any, user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Update user
        return await userModel.findByIdAndUpdate(id, user);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating user ${id}: ${error}`);
    }
}

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Create / Insert new user
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM ERROR]: Creating user: ${error}`);
    }
}

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        let userFound: IUser | undefined = undefined;
        let token = undefined;

        // Check if user exists by Unique Email
        await userModel.findOne({email: auth.email}).then((user: IUser) => {
            userFound = user;
        }).catch((error) => {
            console.error('[ERROR Authentication in ORM]: User not found');
            throw new Error(`[ERROR Authentication in ORM]: User not found: ${error}`);
        });

        // Use Bcrypt to compare passwords
        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);
        
        // Check if password is valid (compare with bcrypt)
        if(!validPassword) {
            console.error('[ERROR Authentication in ORM]: Password not valid');
            throw new Error('[ERROR Authentication in ORM]: Password not valid');
        }

        // Generate our JWT
        token = jwt.sign({email: userFound!.email}, secret, {
            expiresIn: "24h"
        });

        return {
            user: userFound,
            token: token
        } 
        
    } catch (error) {
        LogError(`[ORM ERROR]: Login user: ${error}`);
    }
}

// Logout User
export const logoutUser = async (): Promise<any | undefined> => {
    // TODO: Not implemented
}