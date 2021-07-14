import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  url = "http://localhost:4444/monitoring/"

  constructor(private http: HttpClient) { }

  likeMusic(username:string,title:string){
    const params = new HttpParams().set("username",username).set("title",title);
    return this.http.post(this.url + 'likeMusic',params);
  }

  unLikeMusic(username:string,title:string){
    const params = new HttpParams().set("username",username).set("title",title);
    const options = {params:params};
    return this.http.delete(this.url + 'unLikeMusic',options);
  }

  shareMusic(username:string,title:string,sharingMsg:string){
    const params = new HttpParams().set("username",username).set("title",title).set('sharingMsg',sharingMsg);
    return this.http.post(this.url + 'shareMusic',params);
  }

  unShareMusic(username:string,title:string){
    const params = new HttpParams().set("username",username).set("title",title);
    const options = {params:params};
    return this.http.delete(this.url + 'unShareMusic',options);
  }

  subscribe(username:string,usernameToFollow:string){
    const params = new HttpParams().set("username",username).set("usernameToFollow",usernameToFollow);
    return this.http.post(this.url + 'subscribe',params);
  }

  unSubscribe(username:string,usernameToUnFollow:string){
    const params = new HttpParams().set("username",username).set("usernameToUnFollow",usernameToUnFollow);
    const options = {params:params};
    return this.http.delete(this.url + 'unSubscribe',options);
  }

  checkIfSubscribeTo(username:string,usernameSubscribeTo:string){
    const params = new HttpParams().set("username",username).set("usernameSubscribeTo",usernameSubscribeTo);
    const options = {params:params};
    return this.http.get<boolean>(this.url + 'checkIfSubscribeTo',options);
  }

}
