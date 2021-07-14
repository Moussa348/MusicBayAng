import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = "http://localhost:4444/comment/";
  
  constructor(private http: HttpClient) { }

  postComment(comment:Comment,title:string){
    return this.http.post<Comment>(this.url + 'postComment/' + title,comment);
  }

  increaseLike(id:number,username:string){
    const params = new HttpParams().set("id",id.toString()).set("username",username);
    return this.http.patch<Comment>(this.url + 'increaseLike', params);
  }

  decreaseLike(id:number,username:string){
    const params = new HttpParams().set("id",id.toString()).set("username",username);
    return this.http.patch<Comment>(this.url + 'decreaseLike', params);
  }

  getListCommentOfMusic(title:string,noPage:number){
    const params = new HttpParams().set("title",title).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<Comment[]>(this.url + 'getListCommentOfMusic/',options);
  }
}
