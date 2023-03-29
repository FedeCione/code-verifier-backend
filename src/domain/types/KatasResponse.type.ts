import { IKata } from '../interfaces/IKata.interface';

export type UserResponse = {
    katas: IKata[],
    totalPages: number,
    currentPage: number
};