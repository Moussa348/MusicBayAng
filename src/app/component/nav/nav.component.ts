import { Component } from '@angular/core';
import { COMPONENTS_TAGS } from 'src/app/util/constant';
import { getUsername } from 'src/app/util/jwtUtils';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  username = getUsername();
  openCart = false;
  openNotification = false;
  public isMenuCollapsed = true;
  
  constructor(
  ){}

  showNotification(){
    return this.openNotification;
  }
  showCart(){
    return this.openCart;
  }


  isLoggedIn(){
    return this.username != null;
  }

  isCartOpen($event){
    console.log($event);
    this.openCart = $event;
  }

  getComponentTag(){
    return COMPONENTS_TAGS[0];
  }

}
