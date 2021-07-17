import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecentNotification } from '../model/recent-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url = "http://localhost:4444/notification/"
  
  constructor(private http: HttpClient) { }

  notficationSeen(id:number){
    return this.http.patch(this.url + 'notificationSeen/' + id,null);
  }

  getRecentNotifications(username:string,noPage:number){
    const params = new HttpParams().set('username',username).set('noPage',noPage.toString());
    const options = {params:params};
    return this.http.get<RecentNotification[]>(this.url + 'getRecentNotifications',options);
  }
}
