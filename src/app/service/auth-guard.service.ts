import { Injectable } from '@angular/core';
import { JwtToken } from '../model/jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  isLoggedIn() {
    return sessionStorage.getItem('token')!=null;
  }

  login(token:JwtToken){
    sessionStorage.setItem('username',token.username);
    sessionStorage.setItem('token',token.token);
  }

  logout(){
    sessionStorage.clear();
  }
}
