import express, { Request, Response } from "express";
import { AuthController } from "../controller/authController";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";


// BCRYPT for passwords
import bcrypt from 'bcrypt';

// JWT verifier middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";

// Body Parser( Read JSON from body in requests)
import bodyParser from 'body-parser';

// Middleware to read JSON in Body
let jsonParser = bodyParser.json();

// Router from Express
let authRouter = express.Router();

authRouter.route('/register')
    .post (jsonParser, async ( req:Request, res:Response) => {

        let { name, email, password, age} = req?.body;

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
        } else {
            // Send Response to the Client
            return res.status(400).send({
                message: '[ERROR User Data Missing]: No user can be registered'
            });
        }
    })

authRouter.route('/login')
    .post (jsonParser, async (req:Request, res:Response) => {

        let { email, password } = req?.body;

        if(email && password) {

            // Controller Instance to Execute Method
            const controller: AuthController = new AuthController();

            let auth: IAuth = {
                email: email,
                password: password
            }

            // Obtain Response
            const response: any = await controller.loginUser(auth);

            // Send Response to the Client which includes the JWT to authorize requests
            return res.status(200).send(response);
        } else {
            // Send Response to the Client
            return res.status(400).send({
                message: '[ERROR User Data Missing]: No user can be registered'
            });
        }
    });

    // Route protected by VerifyToken Middleware
    authRouter.route('/me')
        .get(verifyToken, async (req:Request, res:Response) => {

            // Obtain the ID of User to check it's data
            let id: any = req?.query?.id;

            if(id) {

                // Controller: Auth controller
                const controller: AuthController = new AuthController();

                // Obtain response from controller
                let response: any = await controller.userData(id);

                // If user is authorized
                return res.status(200).send(response);

            } else {
                return res.status(401).send({
                    message: 'You are not authorized to perform this action'
                });
            }

        });


export default authRouter;