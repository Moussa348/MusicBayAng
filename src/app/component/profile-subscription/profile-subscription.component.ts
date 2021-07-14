import { Component, Input, OnInit } from '@angular/core';
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
  subscriptions:Customer[] = new Array();
  SUB_TYPE = ['subscriber','subscribe_to'];
  noPageSub = 0 ;
  noPageSubTo = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private customerService:CustomerService,
    private feedService:FeedService
  ) { }

  ngOnInit(): void {
    console.log(this.username + ' ' + this.subType);
    
    if(this.subType == this.SUB_TYPE[0]){
      this.getListSubscriber();
    }else{
      this.getListSubscribeTo();
    }
  }

  getListSubscriber(){
    this.feedService.getListSubscriber(this.username,this.noPageSub).subscribe(
      (data) =>{
        this.subscriptions = data;
        console.log(this.subscriptions);
      },(err)=>{
        console.log(err);
      }
    );
  }

  getListSubscribeTo(){
    this.feedService.getListSubscribeTo(this.username,this.noPageSub).subscribe(
      (data) =>{
        this.subscriptions = data;
        console.log(this.subscriptions);
      },(err)=>{
        console.log(err);
      }
    );
  }

  /*
  TODO 
    --> loadMore(subType:string)
        +this.noPage +=1;
        1)getListSubscriber()
        2)getListSubscribeTo()
  */

}
