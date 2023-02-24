import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogWarning, LogError } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// ORM - Users Collection
import { registerUser, loginUser, logoutUser } from '../domain/orm/User.orm';

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
                message: 'Please, provide an user entity to create one'
            }
        }

        return response;
    }

    @Post('/login')
    public async loginUser(auth: IAuth): Promise<any> {

        let response: any = '';

        if(auth) {
            LogSuccess(`[api/auth/login] Logged in user: ${auth.email}`);
            await loginUser(auth).then((r) => {
                LogSuccess(`[api/auth/login] Logged in user: ${auth.email}`);
                response = {
                    message: `User logged in successfully: ${auth.email}`,
                    token: r.token // JWT Generated for logged in user
                }
            })
            .catch((err) => {
                return err;
            })
        } else {
            LogWarning('[api/auth/login] Login needs auth entity(email && password)');
            response = {
                message: 'Please, provide an user email and password to login'
            }
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