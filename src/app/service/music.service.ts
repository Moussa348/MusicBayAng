import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalog } from '../model/catalog';
import { Music } from '../model/music';
import { STORAGE_KEY } from '../util/constant';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  url = "http://localhost:4444/music/"
  
  constructor(private http: HttpClient) { }

  getMusic(title:string){
    return this.http.get<Music>(this.url + 'getMusic/' + title);
  }

  getCatalog(username:string,noPage:number){
    const params = new HttpParams().set("username",username).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<Catalog>(this.url + 'getCatalog/',options);
  }

  getListMusic(noPage:number){
    return this.http.get<Music[]>(this.url + 'getListMusic/' + noPage);
  }

  getNbrOfPage(){
    return this.http.get<number>(this.url + 'getNbrOfPage/');
  }
}
