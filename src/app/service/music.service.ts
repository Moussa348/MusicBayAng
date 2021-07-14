import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalog } from '../model/catalog';
import { Music } from '../model/music';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  url = "http://localhost:4444/music/"
  
  constructor(private http: HttpClient) { }

  getMusic(title:string){
    return this.http.get<Music>(this.url + 'getMusic/' + title);
  }

  getCatalog(username:string){
    return this.http.get<Catalog>(this.url + 'getCatalog/' + username);
  }

  getListMusic(){
    return this.http.get<Music[]>(this.url + 'getListMusic');
  }
}
