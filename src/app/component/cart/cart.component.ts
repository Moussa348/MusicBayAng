import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { getUsername } from 'src/app/util/jwtUtils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  transaction: Transaction = new Transaction();
  username = getUsername();
  transacPending: boolean;
  @Output() isOpen = new EventEmitter();

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getCurrentTransaction();
    //this.isOpen.emit(true);
  }

  getCurrentTransaction() {
    this.transactionService.getCurrentTransaction(this.username).subscribe(
      (data) => {
        this.transacPending = true;
        this.transaction = data;
        console.log(this.transaction);
      },
      (err) => {
        if(err){
          this.transacPending = false;
          
          console.log(err);
        }
      }
      );
    }
    
    removeMusicFromTransaction(title: string) {
    this.transactionService
    .removeArticleFromTransaction(this.username, title)
    .subscribe(
      (data) => {
        this.transaction = data;
        console.log(this.transaction);
        if (this.transaction.musicArticles.length == 0) {
            this.transacPending = false;
            this.transactionService
              .cancelTransaction(this.username, this.transaction.uuid)
              .subscribe();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    //this.isOpen.emit(false);
  }

  openCart(boolean){
    
  }

  hasTransactionAppending() {
    return this.transacPending;
  }
}
