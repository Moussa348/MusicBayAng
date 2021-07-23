import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtToken } from '../model/jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const url = route.url.join('');
    
    if(!this.isLoggedIn() && url == 'feed' || url == 'conversation'){
      this.router.navigate(['/login']);
      return false;
    }
    if(this.isLoggedIn() && url == 'registration'){
      this.router.navigate(['/home'])
      return false;
    }
    return true;
  }
  
  isLoggedIn() {
    return sessionStorage.getItem('token')!=null;
  }

  login(token:JwtToken){
    sessionStorage.setItem('token',token.token);
  }

  logout(){
    sessionStorage.clear();
  }
}
