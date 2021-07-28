import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  url = "http://localhost:4444/transaction/"

  constructor(private http: HttpClient) { }

  checkIfTransactionPending(username:string){
    return this.http.get<boolean>(this.url + 'checkIfTransactionPending/' + username);
  }

  checkIfArticleIsInTransaction(username:string,title:string){
    const params = new HttpParams().set("username",username).set("title",title);
    const options = {params:params};
    return this.http.get<boolean>(this.url + 'checkIfArticleIsInTransaction/',options);
  }

  createTransaction(username:string,title:string,priceType:string){
    const params = new HttpParams().set("username",username).set("title",title).set("priceType",priceType);
    const options = {params:params};
    return this.http.post<Transaction>(this.url + 'createTransaction/',params);
  }

  addArticleInTransaction(username:string,title:string,priceType:string){
    const params = new HttpParams().set("username",username).set("title",title).set("priceType",priceType);
    const options = {params:params};
    return this.http.patch<Transaction>(this.url + 'addArticleInTransaction/',params);
  }

  removeArticleFromTransaction(username:string,title:string){
    const params = new HttpParams().set("username",username).set("title",title);
    const options = {params:params};
    return this.http.delete<Transaction>(this.url + 'removeArticleFromTransaction/',options);
  }

  cancelTransaction(username:string,uuid:string){
    const params = new HttpParams().set("username",username).set("uuid",uuid);
    const options = {params:params};
    return this.http.delete(this.url + 'cancelTransaction/',options);
  }

  getCurrentTransaction(username:string){
    return this.http.get<Transaction>(this.url + 'getCurrentTransaction/' + username);
  }
}
