import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogWarning, LogError } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// ORM - Users Collection
import { registerUser, loginUser, logoutUser, getUserById } from '../domain/orm/User.orm';
import { AuthResponse, ErrorResponse } from './types';

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {

    @Post('/register')
    public async registerUser(user: IUser): Promise<any> {

        let response: any = '';

        if(user) {
            LogSuccess(`[api/auth/register] Register new user: ${user.name}`);
            await registerUser(user).then((r) => {
                LogSuccess(`[api/auth/register] Created user: ${user.email}`);
                response = {
                    message: `User created successfully: ${user.name}`
                }
            });
        } else {
            LogWarning('[api/auth/register] Register needs user entity');
            response = {
                message: 'User not registered: Please, provide an user entity to create one'
            }
        }

        return response;
    }

    @Post('/login')
    public async loginUser(auth: IAuth): Promise<any> {

        let response: AuthResponse | ErrorResponse | undefined;

        if(auth) {
            LogSuccess(`[api/auth/login] Logged in user: ${auth.email}`);
            let data = await loginUser(auth);
            response = {
                token: data.token,
                message: `Welcome, ${data.user.name}`
            }
        } else {
            LogWarning('[api/auth/login] Login needs auth entity(email && password)');
            response = {
                error: '[AUTH ERROR]: Email & Password are needed',
                message: 'Please, provide an user email and password to login'
            }
        }

        return response;
    }

    /**
     * Endpoint to retrieve the User in the collection "Users" of DB
     * Middleware: Validate JWT
     * In headers you must add the x-access-token with a valid JWT
     * @param {string} id Id of user to retrieve (optional)
     * @returns All Users or User by ID
     */
    @Get("/me")
    public async userData(@Query()id: string): Promise<any> {

        let response: any = '';

        if(id) {
            LogSuccess(`[api/users] Get data user by ID: ${id}`);
            response = await getUserById(id);
            // Remove password from response
            response.password = '';
        }

        return response;
    }

    @Post('/logout')
    public async logoutUser(): Promise<any> {

        let response: any = '';

        // TODO: Close session of user 
        throw new Error('Method not implemented.');
    }
    
}