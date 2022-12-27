import express, { Request, Response } from "express";
import { HelloController } from "../controller/HelloController";
import { LogInfo } from "../utils/logger";

// Router from Express
let helloRouter = express.Router();

// http://localhost:8000/api/hello?name=Fede/
helloRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param
        let name: any = req?.query?.name;
        LogInfo(`Query Param: ${name}`);
        // Controller Instance to Execute Method
        const controller: HelloController = new HelloController();
        // Obtain Response
        const response = await controller.getMessage(name);
        // Send Response to the Client
        return res.send(response);
    })

// Export Hello Router
export default helloRouter;