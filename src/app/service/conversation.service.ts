import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversation } from '../model/conversation';
import { SentMessage } from '../model/sent-message';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  url = "http://localhost:4444/conversation/";
  
  constructor(private http: HttpClient) { }

  createConversation(conversation:Conversation){
    return this.http.post<Conversation>(this.url + 'createConversation/',conversation);
  }

  addUserInConversationGroup(id:number,username:string){
    const params = new HttpParams().set("id",id.toString()).set("username",username);
    return this.http.patch(this.url + 'addUserInConversationGroup/',params);
  }

  removeUserFromConversationGroup(id:number,username:string){
    const params = new HttpParams().set("id",id.toString()).set("username",username);
    const options = {params:params};
    return this.http.delete(this.url + 'removeUserFromConversationGroup/',options);
  }

  sendMessageInConversation(sentMessage:SentMessage){
    return this.http.patch<SentMessage>(this.url + 'sendMessageInConversation/',sentMessage);
  }

  getMessagesFromConversation(id:number,noPage:number){
    const params = new HttpParams().set("id",id.toString()).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<Conversation>(this.url + 'getMessagesFromConversation/',options);
  }

  
  getLastSentMessages(username:string,noPage:number){
    const params = new HttpParams().set("username",username).set("noPage",noPage.toString());
    const options = {params:params};
    return this.http.get<SentMessage[]>(this.url + 'getLastSentMessages/',options);
  }

  deleteConversation(id:number){
    return this.http.delete(this.url + 'deleteConversation/' + id);
  }
}
