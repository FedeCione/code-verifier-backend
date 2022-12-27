import { BasicResponse, BasicResponseWithDate } from "../types";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IGoodbyeController {
    getMessage(name?:string): Promise<BasicResponseWithDate>
}