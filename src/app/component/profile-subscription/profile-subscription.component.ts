import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { FeedService } from 'src/app/service/feed.service';
import { MonitoringService } from 'src/app/service/monitoring.service';

@Component({
  selector: 'app-profile-subscription',
  templateUrl: './profile-subscription.component.html',
  styleUrls: ['./profile-subscription.component.css']
})
export class ProfileSubscriptionComponent implements OnInit {
  @Input() username;
  @Input() subType;
  @Output() nbSub: EventEmitter<number> = new EventEmitter<number>();
  subscriptions:Customer[] = new Array();

  SUB_TYPE = ['subscriber','subscribe_to'];
  noPageSub = 0 ;
  totalPageSub = 0
  noPageSubTo = 0;
  totalPageSubTo = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private feedService:FeedService
  ) { }

  ngOnInit(): void {
    console.log(this.username + ' ' + this.subType);
    
    if(this.subType == this.SUB_TYPE[0]){
      this.getNbrOfPageSub();
      this.getListSubscriber();
    }else{
      this.getNbrOfPageSubTo();
      this.getListSubscribeTo();
    }
    this.nbSub.emit(this.subscriptions.length);
  }

  getNbrOfPageSub(){
    this.feedService.getNbrOfPageSub(this.username).subscribe(
      (data) =>{
        this.totalPageSub = data;
      },(err) =>{
        console.log(err);
      }
    );
  }

  getNbrOfPageSubTo(){
    this.feedService.getNbrOfPageSubTo(this.username).subscribe(
      (data) =>{
        this.totalPageSubTo = data;
      },(err) =>{
        console.log(err);
      }
    );
  }

  getListSubscriber(){
    this.feedService.getListSubscriber(this.username,this.noPageSub).subscribe(
      (data) =>{
        console.log(data);
        this.subscriptions.push.apply(this.subscriptions, data);
      },(err)=>{
        console.log(err);
      }
    );
  }

  getListSubscribeTo(){
    this.feedService.getListSubscribeTo(this.username,this.noPageSubTo).subscribe(
      (data) =>{
        console.log(data);
        this.subscriptions.push.apply(this.subscriptions, data);
      },(err)=>{
        console.log(err);
      }
    );
  }

  loadMoreSub(){
    if(this.subType == this.SUB_TYPE[0]){
      this.noPageSub++;
      this.getListSubscriber();
    }else{
      this.noPageSubTo++;
      this.getListSubscribeTo();
    }
  }

  isLastPage(){
    if(this.subType == this.SUB_TYPE[0]){
      return this.noPageSub + 1 == this.totalPageSub;
    }else{
      return this.noPageSubTo + 1 == this.totalPageSubTo;
    }
  }

  /*
  TODO 
    --> loadMore(subType:string)
        +this.noPage +=1;
        1)getListSubscriber()
        2)getListSubscribeTo()
  */

}
