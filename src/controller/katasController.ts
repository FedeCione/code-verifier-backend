import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IKataController } from './interfaces';
import { LogSuccess, LogWarning, LogError } from '../utils/logger';

// ORM - Katas Collection
import { getAllKatas, getKataById, deleteKataById, createKata, updateKataById, getKataByLevel, getRecentKatas, getKatasByValoration, updateValorationKataById, getKatasByAttemps } from '../domain/orm/Kata.orm';

@Route('/api/katas')
@Tags('KataController')
export class KataController implements IKataController {
     /**
     * Endpoint to retrieve the katas in the collection "katas" of DB
     * @param {string} id Id of kata to retrieve (optional)
     * @returns All katas or kata by ID
     */
    @Get("/")
    public async getKatas(@Query()page:number, @Query()limit: number, @Query()id?: string, level?: number): Promise<any> {

        let response: any = '';

        if(id) {
            LogSuccess(`[api/katas] Get kata by ID: ${id}`);
            response = await getKataById(id);
        } else if(level) {
            LogSuccess(`[api/katas] Get kata by Level: ${level}`);
            response = await getKataByLevel(level);
        } else {
            LogSuccess('[api/katas] Get all katas request');
            response = await getAllKatas(page, limit);
        }
        return response;
    }

     /**
     * Endpoint to retrieve the recent katas in the collection "katas" of DB
     * @returns Five recent katas
     */
     @Get("/recent")
        public async getRecentKatas(): Promise<any> {
        LogSuccess('[api/katas/recent] Get 5 recent katas request');
        return await getRecentKatas();
     }

     /**
     * Endpoint to retrieve sorted katas by valoration in the collection "katas" of DB
     * @returns  sorted katas by valoration
     */
     @Get("/valoration")
        public async getKatasByValoration(): Promise<any> {
        LogSuccess('[api/katas/valoration] Get katas sorted by valoration request');
        return await getKatasByValoration();
     }

     /**
     * Endpoint to retrieve the recent katas in the collection "katas" of DB
     * @returns Five recent katas
     */
     @Get("/attemps")
        public async getKatasByAttemps(): Promise<any> {
        LogSuccess('[api/katas/attemps] Get katas sorted by attemps request');
        return await getKatasByAttemps();
     }

     /**
     * Endpoint to delete the katas in the collection "katas" of DB
     * @param {string} id Id of kata to delete (optional)
     * @returns Message informing if deletion was correct
     */
    @Delete("/")
    public async deleteKata(@Query()id?: string): Promise<any> {

        let response: any = '';

        if(id) {
            LogSuccess(`[api/katas] Delete kata by ID: ${id}`);
            await deleteKataById(id).then((r) => {
                response = {
                    message: `Kata with ID ${id} deleted successfully`
                }
            })
        } else {
            LogWarning('[api/katas] Delete kata request without ID');
            response = {
                message: 'Please, provide an ID to delete from database'
            }
        }
        return response;
    }

    /**
    * Endpoint to create a kata in the collection "katas" of DB
    * @returns Message informing if creation was correct
    */
    @Post("/")
    public async createKata(kata: any): Promise<any> {
        let response: any = '';

        await createKata(kata).then((r) => {
            LogSuccess(`[api/katas] Create kata: ${kata}`);
            response = {
                message: `Kata created successfully: ${kata.name}`
            }
        });

        return response;
    }


    /**
    * Endpoint to update a kata in the collection "katas" of DB
    * @param {string} id Id of kata to update
    * @returns Message informing if update was correct
    */
    @Put("/")
    public async updateKata(@Query()id: string, kata: any): Promise<any> {
        
        let response: any = '';

        if(id) {
            LogSuccess(`[api/katas] Update kata by ID: ${id}`);
            await updateKataById(id, kata).then((r) => {
                response = {
                    message: `Kata with ID ${id} updated successfully`
                }
            })
        } else {
            LogWarning('[api/kata] Update kata request without ID');
            response = {
                message: 'Please, provide an ID to update an existing kata'
            }
        }
        return response;
    }

    /**
    * Endpoint to update valoration kata in the collection "katas" of DB
    * @param {string} id Id of kata to update valoration
    * @returns Message informing if update was correct
    */
    @Put("/")
    public async updateValorationKata(@Query()id: string, newValoration: any): Promise<any> {
            
        let response: any = '';
    
        if(id) {
            LogSuccess(`[api/katas] Update valoration kata by ID: ${id}`);
            await updateValorationKataById(id, newValoration).then((r) => {
                response = {
                    message: `Kata valoration with ID ${id} updated successfully`
                }
            })
        } else {
            LogWarning('[api/kata] Update valoration kata request without ID');
            response = {
                message: 'Please, provide an ID to update an existing valoration kata'
            }
        }
        return response;
    }
}