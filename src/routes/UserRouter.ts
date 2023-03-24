import express, { Request, Response } from "express";
import { UserController } from "../controller/usersController";
import { LogInfo } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";

// BCRYPT for passwords
import bcrypt from 'bcrypt';

//  Body parser to read Body from the requests
import bodyParser from 'body-parser';

let jsonParser = bodyParser.json();

// JWT verifier middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";

// Router from Express
let usersRouter = express.Router();

// http://localhost:8000/api/users?id=<user id>
usersRouter.route('/')
    // GET:
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        // Controller Instance to Execute Method
        const controller: UserController = new UserController();
        // Obtain Response
        const response: any = await controller.getUsers(id);
        // Send Response to the Client
        return res.status(200).send(response);
    })

    // DELETE:
    .delete(verifyToken, async (req:Request, res:Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
       // Controller Instance to Execute Method
       const controller: UserController = new UserController();
       // Obtain Response
       const response: any = await controller.deleteUser(id);
       // Send Response to the Client
       return res.status(200).send(response);
    })

    // PUT:
    .put(verifyToken, async (req:Request, res:Response) => {
        // Obtain a Query Params (id, name, age, email)
        let id: any = req?.query?.id;
        let name: any = req?.query?.name;
        let age: any = req?.query?.age;
        let email: any = req?.query?.email;
        LogInfo(`Query Param: ${id}, ${name}, ${age}, ${email}`);

        // Controller Instance to Execute Method
        const controller: UserController = new UserController();

        const user = {
            name: name,
            age: age,
            email: email
        }

        // Obtain Response
        const response: any = await controller.updateUser(id, user);
        // Send Response to the Client
        return res.status(200).send(response);
    })

// Export Hello Router
export default usersRouter;

/**
 * 
 * Get Documents => 200 OK
 * Creation Documents => 200 OK
 * Deletion of Documents => 200 (Entity) / 204 (No return)
 * Update of Documents => 200 Entity / 204 (No return)
 * 
 */