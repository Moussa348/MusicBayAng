import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TransactionService } from 'src/app/service/transaction.service';
import { AuthGuardService } from 'src/app/service/auth-guard.service';
import { getUsername } from 'src/app/util/jwtUtils';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  username = getUsername();
  openCart = false;
  openNotification = true;
  public isMenuCollapsed = true;
  
  constructor(
  ){}

  getNotificationStatus(){
    return this.openNotification;
  }
  showCart(){
    return this.openCart;
  }

  setNOtificationStatus(){
    this.openNotification = !this.openNotification;
  }

  isLoggedIn(){
    return this.username != null;
  }

}
