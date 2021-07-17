import decode from 'jwt-decode';
import { STORAGE_KEY } from './constant';

export const getUsername  = ():string =>{
    let token = sessionStorage.getItem(STORAGE_KEY);
    return token != null ? decode<any>(token).username:"";
}