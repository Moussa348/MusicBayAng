import decode from 'jwt-decode';
import { STORAGE_KEY } from './constant';


export function getUsername(){
    return sessionStorage.getItem(STORAGE_KEY) != null ? decode<any>(sessionStorage.getItem(STORAGE_KEY)).userUsername:null;
}