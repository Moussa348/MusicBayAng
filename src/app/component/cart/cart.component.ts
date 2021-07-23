import { Component, OnInit, Output } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { EventEmitter } from '@angular/core';
import { getUsername } from 'src/app/util/jwtUtils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  transaction: Transaction = new Transaction();
  username = getUsername();

  constructor(
    private transactionService:TransactionService
  ) { }

  ngOnInit(): void {
    this.getCurrentTransaction();
  }

  getCurrentTransaction(){
    this.transactionService.checkIfTransactionPending(this.username).subscribe(
      (data) =>{
        if(data){
          
          
          this.transactionService.getCurrentTransaction(this.username).subscribe(
            (data) =>{
              this.transaction = data;
              console.log(this.transaction);
            },(err) =>{
              console.log(err);
            }
          );
        }
      },(err) =>{
        console.log(err);
      }
    );
  }

  removeMusicFromTransaction(title:string){
    this.transactionService.removeArticleFromTransaction(this.username,title).subscribe(
      (data) =>{
        this.transaction = data;
        console.log(this.transaction);
        if(this.transaction.musicArticles.length == 0){
          this.transactionService.cancelTransaction(this.username,this.transaction.uuid).subscribe();
        }
      },(err)=>{
        console.log(err);
      }
    );
  }

  hasTransactionAppending(){
    return this.transaction.musicArticles != undefined;
  }

}
