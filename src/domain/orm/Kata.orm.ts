import { kataEntity } from "../entities/kata.entity";

import { LogSuccess, LogError } from "../../utils/logger";
import { IKata } from "../interfaces/IKata.interface";

// CRUD

/**
 * Method to obtain all katas from collection "katas" in Mongo Server
 */
export const getAllKatas = async (page:number, limit: number): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();

        let response: any = {};

        // Search all katas (using pagination)
        await kataModel.find({isDelete: false})
            .select('name description level users attemps date valoration')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((users: IKata[]) => {
                response.users = users;
            });

        // Count total documents in collection "Katas"
        await kataModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;


    } catch (error) {
        LogError(`[ORM ERROR]: Getting all katas: ${error}`);
    }
}

// - Get kata by ID
export const getKataById = async (id: string): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        // Search kata by ID
        return await kataModel.findById(id).select('name description level users attemps date valoration');
    } catch (error) {
        LogError(`[ORM ERROR]: Getting kata by ID: ${error}`);
    }
}

// - Get kata by level
export const getKataByLevel = async (level: number): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        // Search kata by level
        return await kataModel.findOne({level: level}).select('name description level users attemps date valoration');
    } catch (error) {
        LogError(`[ORM ERROR]: Getting kata by Level: ${error}`);
    }
}

// - Get 5 recent katas
export const getRecentKatas = async (): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        // Search recent katas
        return await kataModel.find().sort({date: -1}).limit(5).select('name description level users attemps date valoration');
    } catch (error) {
        LogError(`[ORM ERROR]: Getting 5 recent katas: ${error}`);
    }
}

// - Get katas sorted by valoration
export const getKatasByValoration = async (): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        // Search katas sorted
        return await kataModel.find().sort({valoration: -1}).select('name description level users attemps date valoration');
    } catch (error) {
        LogError(`[ORM ERROR]: Getting sorted katas by valoration: ${error}`);
    }
}

// - Get katas sorted by attemps
export const getKatasByAttemps = async (): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        // Search katas sorted
        return await kataModel.find().sort({attemps: -1}).select('name description level users attemps date valoration');
    } catch (error) {
        LogError(`[ORM ERROR]: Getting sorted katas by attemps: ${error}`);
    }
}

// - Delete kata by ID
export const deleteKataById = async (id: string): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        // Delete kata by ID
        return await kataModel.deleteOne({_id: id});

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting kata by ID: ${error}`);
    }
}

// - Create new kata
export const createKata = async (kata: any): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        // Create / Insert new user
        return await kataModel.create(kata);

    } catch (error) {
        LogError(`[ORM ERROR]: Creating kata: ${error}`);
    }
}

// - Update kata by ID
export const updateKataById = async (id: any, kata: any): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        // Update kata
        return await kataModel.findByIdAndUpdate(id, kata);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating kata ${id}: ${error}`);
    }
}

// - Update valoration kata by ID
export const updateValorationKataById = async (id: any, newValoration: any): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        
        // Obtain old valoration for calculate average with new valoration
        let oldValoration: any = await kataModel.findById(id);
        newValoration.valoration = (+oldValoration.valoration + +newValoration.valoration) / 2;

        // Update kata
        return await kataModel.findByIdAndUpdate(id, newValoration);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating valoration kata ${id}: ${error}`);
    }
}

