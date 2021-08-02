import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { Feed } from '../model/feed';
import { LikedMusic } from '../model/liked-music';
import { PurchasedMusic } from '../model/purchased-music';
import { SharedMusic } from '../model/shared-music';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  url = "http://localhost:4444/feed/"

  constructor(private http: HttpClient) { }

  getFeed(username:string,noPage:number){
    const params = new HttpParams().set("username",username).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<Feed>(this.url + 'getFeed',options);
  }

  getListPossibleSubscribeTo(username:string,noPage:number){
    const params = new HttpParams().set("username",username).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<Customer[]>(this.url + 'getListPossibleSubscribeTo/',options);
  }

  getListLikedMusic(username:string,noPage:number){
    const params = new HttpParams().set("username",username).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<LikedMusic[]>(this.url + 'getListLikedMusic/',options);
  }

  getListSharedMusic(username:string,noPage:number){
    const params = new HttpParams().set("username",username).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<SharedMusic[]>(this.url + 'getListSharedMusic/',options);
  }

  getListPurchasedMusic(username:string,noPage:number){
    const params = new HttpParams().set("username",username).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<PurchasedMusic[]>(this.url + 'getListPurchasedMusic/',options);
  }

  getListSubscriber(username:string,noPage:number){
    const params = new HttpParams().set("username",username).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<Customer[]>(this.url + 'getListSubscriber/',options);
  }

  getListSubscribeTo(username:string,noPage:number){
    const params = new HttpParams().set("username",username).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<Customer[]>(this.url + 'getListSubscribeTo/',options);
  }

  getNbrOfPageSub(username:string){
    return this.http.get<number>(this.url + 'getNbrOfPageSub/' + username);
  }

  getNbrOfPageSubTo(username:string){
    return this.http.get<number>(this.url + 'getNbrOfPageSubTo/' + username);
  }

}
