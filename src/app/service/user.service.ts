import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:4444/user/";

  constructor(private http: HttpClient) { }

  getProfile(username:string){
    return this.http.get<Customer>(this.url + 'getProfile/' + username);
  }

  getListProfileSearch(){
    return this.http.get<Customer[]>(this.url + 'getListProfileSearch/');
  }
}
