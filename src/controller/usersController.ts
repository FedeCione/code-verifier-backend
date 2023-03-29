import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IUserController } from './interfaces';
import { LogSuccess, LogWarning, LogError } from '../utils/logger';

// ORM - Users Collection
import { getAllUsers, getUserById, deleteUserById, createUser, updateUserById } from '../domain/orm/User.orm';

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
     /**
     * Endpoint to retrieve the Users in the collection "Users" of DB
     * @param {string} id Id of user to retrieve (optional)
     * @returns All Users or User by ID
     */
    @Get("/")
    public async getUsers(@Query()page:number, @Query()limit: number, @Query()id?: string): Promise<any> {

        let response: any = '';

        if (id) {
            LogSuccess(`[api/users] Get user by ID: ${id}`);
            response = await getUserById(id);
        } else {
            LogSuccess('[api/users] Get all users request');
            response = await getAllUsers(page, limit);
            // TODO: Remove passwords from response
        }
        return response;
    }

     /**
     * Endpoint to delete the Users in the collection "Users" of DB
     * @param {string} id Id of user to delete (optional)
     * @returns Message informing if deletion was correct
     */
    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {

        let response: any = '';

        if(id) {
            LogSuccess(`[api/users] Delete user by ID: ${id}`);
            await deleteUserById(id).then((r) => {
                response = {
                    message: `User with ID ${id} deleted successfully`
                }
            })
        } else {
            LogWarning('[api/users] Delete user request without ID');
            response = {
                message: 'Please, provide an ID to delete from database'
            }
        }
        return response;
    }

    @Put("/")
    public async updateUser(@Query()id: string, user: any): Promise<any> {
        
        let response: any = '';

        if(id) {
            LogSuccess(`[api/users] Update user by ID: ${id}`);
            await updateUserById(id, user).then((r) => {
                response = {
                    message: `User with ID ${id} updated successfully`
                }
            })
        } else {
            LogWarning('[api/users] Update user request without ID');
            response = {
                message: 'Please, provide an ID to update an existing user'
            }
        }
        return response;
    }
}