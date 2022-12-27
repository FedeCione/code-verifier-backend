import { BasicResponse, BasicResponseWithDate } from "./types";
import { IGoodbyeController } from "./interfaces";
import { LogSuccess } from "../utils/logger";

export class GoodbyeController implements IGoodbyeController {

    public async getMessage(name?: string | undefined): Promise<BasicResponseWithDate> {
        LogSuccess('[api/goodbye] Get Request');

        return {
            message: `Goodbye ${name || "Anonymous!"}`,
            date: new Date()
        }
    }
}