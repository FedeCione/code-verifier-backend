import express, { Request, Response } from "express";
import { AuthController } from "../controller/authController";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";


// BCRYPT for passwords
import bcrypt from 'bcrypt';

// Router from Express
let authRouter = express.Router();

authRouter.route('/auth/register')
    .post (async ( req:Request, res:Response) => {

        let { name, email, password, age} = req.body;
        let hashPassword = '';

        if(name && email && password && age) {

            // Obtain the password in request and cypher
            let hashPassword = bcrypt.hashSync(req.body.password, 8);

            let newUser: IUser = {
                name,
                email,
                password: hashPassword,
                age
            }

            // Controller Instance to Execute Method
            const controller: AuthController = new AuthController();

            // Obtain Response
            const response: any = await controller.registerUser(newUser);

            // Send Response to the Client
            return res.status(200).send(response);
        }
    })

authRouter.route('/auth/login')
    .post (async (req:Request, res:Response) => {

        let { email, password } = req.body;

        if(email && password) {

            // Controller Instance to Execute Method
            const controller: AuthController = new AuthController();

            // TODO: use IAuth
            let auth: IAuth = {
                email: email,
                password: password
            }

            // Obtain Response
            const response: any = await controller.loginUser(auth);

            // Send Response to the Client which includes the JWT to authorize requests
            return res.status(200).send(response);
        }
    });

export default authRouter;