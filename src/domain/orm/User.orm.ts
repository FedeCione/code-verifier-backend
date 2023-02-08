import { userEntity } from "../entities/user.entity";

import { LogSuccess, LogError } from "../../utils/logger";

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


// TODO:
// - Get User by Email