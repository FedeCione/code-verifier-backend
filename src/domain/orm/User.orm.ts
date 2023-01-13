import { userEntity } from "../entities/user.entity";

import { LogSuccess, LogError } from "@/utils/logger";

// CRUD

/**
 * Method to obtain all users from collection "Users" in Mongo Server
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        // Search all users
        return await userModel.find({isDelete: false})
    } catch (error) {
        LogError(`[ORM ERROR]: Getting all Users: ${error}`);
    }
}

// TODO:
// - Get User by ID
// - Get User by Email
// - Delete User by ID
// - Create New User
// - Update User by ID