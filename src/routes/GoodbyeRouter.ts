import express, { Request, Response } from "express";
import { GoodbyeController } from "../controller/GoodbyeController";
import { LogInfo } from "../utils/logger";

// Router from Express
let goodbyeRouter = express.Router();

// http://localhost:8000/api/goodbye?name=Fede/
goodbyeRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param
        let name: any = req?.query?.name;
        LogInfo(`Query Param: ${name}`);
        // Controller Instance to Execute Method
        const controller: GoodbyeController = new GoodbyeController();
        // Obtain Response
        const response = await controller.getMessage(name);
        // Send Response to the Client
        return res.send(response);
    })

// Export Hello Router
export default goodbyeRouter;