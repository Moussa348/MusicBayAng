import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-adding-cart-article',
  templateUrl: './adding-cart-article.component.html',
  styleUrls: ['./adding-cart-article.component.css']
})
export class AddingCartArticleComponent implements OnInit {
  username = "bombay";
  hasTransactionPending:boolean;
  articleIsInTransaction:boolean
  basicPriceType = "BASIC";
  exclusivePriceType = "EXCLUSIVE";
  @Input() title;
  @Input() basicPrice;
  @Input() exclusivePrice;

  constructor(
    public activeModal: NgbActiveModal,
    private transactionService:TransactionService
  ) { }

  ngOnInit(): void {
    console.log(this.title,this.basicPrice,this.exclusivePrice);
    this.checkIfTransactionPending();
  }

  checkIfTransactionPending(){
    this.transactionService.checkIfTransactionPending(this.username).subscribe(
      (data) =>{
        this.hasTransactionPending = data;
        console.log(this.hasTransactionPending);
        if(this.hasTransactionPending){
          this.checkIfArticleIsInTransaction();
        }
      },(err)=>{
        console.log(err);
      }
    );
  }

  checkIfArticleIsInTransaction(){
    this.transactionService.checkIfArticleIsInTransaction(this.username,this.title).subscribe(
      (data) => {
        this.articleIsInTransaction = data;
        console.log(this.articleIsInTransaction);
      },(err) =>{
        console.log(err);
      }
    );
  }

  createTransaction(priceType){
    this.transactionService.createTransaction(this.username,this.title,priceType).subscribe(
      (data) =>{
        console.log(data);
        if(data != null){
          console.log('article has been successfully added to the cart');
          this.activeModal.close();
        }
      },(err)=>{
        console.log(err);
      }
    );
  }

  addArticleToTransaction(priceType){
    this.transactionService.addArticleToTransaction(this.username,this.title,priceType).subscribe(
      (data) =>{
        console.log(data);
        if(data != null){
          console.log('article has been successfully added to the cart');
          this.activeModal.close();
        }
      },(err)=>{
        console.log(err);
      }
    );
  }

  isTransactionAppending(){
    return this.hasTransactionPending;
  }

  isArticleInTransaction(){
    return this.articleIsInTransaction;
  }


}
