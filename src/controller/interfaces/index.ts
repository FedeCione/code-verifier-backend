import { BasicResponse, BasicResponseWithDate } from "../types";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IGoodbyeController {
    getMessage(name?:string): Promise<BasicResponseWithDate>
}

export interface IUserController {
    // Read all user from database || Get user by ID
    getUsers(id?: string): Promise<any>
    // Delete User by ID
    deleteUser(id?: string): Promise<any>
    // Create New User
    createUser(user: any): Promise<any>
    // Update User
    updateUser(id:string, user:any): Promise<any>
}