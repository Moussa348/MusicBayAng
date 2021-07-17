import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  username = "bombay";
  openCart = false;
  openNotification = true;
  public isMenuCollapsed = true;

  
  getNotificationStatus(){
    return this.openNotification;
  }
  showCart(){
    return this.openCart;
  }

  setNOtificationStatus(){
    this.openNotification = !this.openNotification;
  }

}
