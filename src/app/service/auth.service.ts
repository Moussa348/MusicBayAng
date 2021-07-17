import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtToken } from '../model/jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = "http://localhost:4444/auth"

  constructor(private http: HttpClient) { }

  login(username:string,password:string){
    const params = new HttpParams()
    .append("username",username)
    .append("password",password);
    return this.http.get<JwtToken>(this.url + "/login",{params:params})
  }
}
