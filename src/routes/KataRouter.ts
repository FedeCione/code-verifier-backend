import express, { Request, Response } from "express";
import { KataController } from "../controller/katasController";
import { LogInfo } from "../utils/logger";

// Router from Express
let katasRouter = express.Router();

// http://localhost:8000/api/katas?id=<kata id>
katasRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        let level: any = req?.query?.level;
        LogInfo(`Query Params: ${id}, ${level}`);
        // Controller Instance to Execute Method
        const controller: KataController = new KataController();
        // Obtain Response
        const response: any = await controller.getKatas(id, level);
        // Send Response to the Client
        return res.send(response);
    })
    
    // DELETE:
    .delete(async (req:Request, res:Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
       // Controller Instance to Execute Method
       const controller: KataController = new KataController();
       // Obtain Response
       const response: any = await controller.deleteKata(id);
       // Send Response to the Client
       return res.send(response);
    })

    // POST:
    .post(async (req:Request, res:Response) => {
        // Obtain a Query Params (name, description, attemps, date, level, users, valoration)
        let name: any = req?.query?.name;
        let description: any = req?.query?.description;
        let attemps: any = req?.query?.attemps;
        let date: any = req?.query?.date;
        let level: any = req?.query?.level;
        let users: any = req?.query?.users;
        let valoration: any = req?.query?.valoration;


        // Controller Instance to Execute Method
        const controller: KataController = new KataController();

        const kata = {
            name: name || "default",
            description: description || "default",
            attemps: attemps || "default",
            date: date || "default",
            level: level || "default",
            users: users || "default",
            valoration: valoration || "default"
        }

        // Obtain Response
        const response: any = await controller.createKata(kata);
        // Send Response to the Client
        return res.send(response);
    })

    // PUT:
    .put(async (req:Request, res:Response) => {
        // Obtain a Query Params (id, name, description, attemps, date, level, users, valoration)
        let id: any = req?.query?.id;
        let name: any = req?.query?.name;
        let description: any = req?.query?.description;
        let attemps: any = req?.query?.attemps;
        let date: any = req?.query?.date;
        let level: any = req?.query?.level;
        let users: any = req?.query?.users;
        let valoration: any = req?.query?.valoration;
        LogInfo(`Query Param: ${id}, ${name}, ${description}, ${attemps}, ${date}, ${level}, ${users}, ${valoration}`);

        // Controller Instance to Execute Method
        const controller: KataController = new KataController();

        const kata = {
            name: name,
            description: description,
            attemps: attemps,
            date: date,
            level: level,
            users: users,
            valoration: valoration
        }

        // Obtain Response
        const response: any = await controller.updateKata(id, kata);
        // Send Response to the Client
        return res.send(response);
    })

katasRouter.route('/recent')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Controller Instance to Execute Method
        const controller: KataController = new KataController();
        // Obtain Response
        const response: any = await controller.getRecentKatas();
        // Send Response to the Client
        return res.send(response);
    })

katasRouter.route('/valoration')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Controller Instance to Execute Method
        const controller: KataController = new KataController();
        // Obtain Response
        const response: any = await controller.getKatasByValoration();
        // Send Response to the Client
        return res.send(response);
    })

    // PUT:
    .put(async (req:Request, res:Response) => {
        // Obtain a Query Params (id, valoration)
        let id: any = req?.query?.id;
        let valoration: any = req?.query?.valoration;
        LogInfo(`Query Param: ${id}, ${valoration}`);

        // Controller Instance to Execute Method
        const controller: KataController = new KataController();

        const newValoration = {
            valoration: valoration
        }

        // Obtain Response
        const response: any = await controller.updateValorationKata(id, newValoration);
        // Send Response to the Client
        return res.send(response);
    })

katasRouter.route('/attemps')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Controller Instance to Execute Method
        const controller: KataController = new KataController();
        // Obtain Response
        const response: any = await controller.getKatasByAttemps();
        // Send Response to the Client
        return res.send(response);
    })

// Export Kata Router
export default katasRouter;