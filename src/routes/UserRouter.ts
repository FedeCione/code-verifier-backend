import express, { Request, Response } from "express";
import { UserController } from "../controller/usersController";
import { LogInfo } from "../utils/logger";

// Router from Express
let usersRouter = express.Router();

// http://localhost:8000/api/users?id=<user id>
usersRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        // Controller Instance to Execute Method
        const controller: UserController = new UserController();
        // Obtain Response
        const response: any = await controller.getUsers(id);
        // Send Response to the Client
        return res.send(response);
    })

    // DELETE:
    .delete(async (req:Request, res:Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
       // Controller Instance to Execute Method
       const controller: UserController = new UserController();
       // Obtain Response
       const response: any = await controller.deleteUser(id);
       // Send Response to the Client
       return res.send(response);
    })

    // POST:
    .post(async (req:Request, res:Response) => {
        // Obtain a Query Params (name, age, email)
        let name: any = req?.query?.name;
        let age: any = req?.query?.age;
        let email: any = req?.query?.email;

        // Controller Instance to Execute Method
        const controller: UserController = new UserController();

        const user = {
            name: name || "default",
            age: age || 69,
            email: email || "default email"
        }

        // Obtain Response
        const response: any = await controller.createUser(user);
        // Send Response to the Client
        return res.send(response);
    })

    // PUT:
    .put(async (req:Request, res:Response) => {
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
        return res.send(response);
    })

// Export Hello Router
export default usersRouter;