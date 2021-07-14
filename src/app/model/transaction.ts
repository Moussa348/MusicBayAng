import { Music } from "./music";
import { MusicArticle } from "./music-article";

export class Transaction {
    uuid:string;
    date:string;
    musicArticles:MusicArticle[];
    total:number;
}
