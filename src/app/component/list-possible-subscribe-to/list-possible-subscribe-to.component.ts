import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Button } from 'protractor';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/model/customer';
import { FeedService } from 'src/app/service/feed.service';
import { MonitoringService } from 'src/app/service/monitoring.service';
import { getUsername } from 'src/app/util/jwtUtils';

@Component({
  selector: 'app-list-possible-subscribe-to',
  templateUrl: './list-possible-subscribe-to.component.html',
  styleUrls: ['./list-possible-subscribe-to.component.css'],
})
export class ListPossibleSubscribeToComponent implements OnInit {
  @Input() username = getUsername();
  noPage = 0;
  totalPage = 0;
  subscribed = false;
  hasMore = false;

  listPossibleSubTo: Customer[] = new Array();
  subscriptions: Map<string, boolean> = new Map();

  constructor(
    private feedService: FeedService,
    private monitoringService: MonitoringService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getNbrTotalPage();
    this.getListPossibleSubscribeTo();
  }

  getListPossibleSubscribeTo() {
    this.feedService
      .getListPossibleSubscribeTo(this.username, this.noPage)
      .subscribe(
        (data) => {
          if(data.length > 0){

            this.listPossibleSubTo.push.apply(this.listPossibleSubTo, data);
            data.forEach((possibleSubTo) =>
            this.subscriptions.set(possibleSubTo.username, false)
            );
            console.log(this.listPossibleSubTo);
            console.log(this.subscriptions);
            //this.hasMore = true;
          }else{
            this.loadMore();
            //this.hasMore = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getNbrTotalPage(){
    this.feedService.getNbrOfPagePossibleSubTo(this.username).subscribe(
      (data) =>{
        this.totalPage = data;
        console.log(this.totalPage);
      },(err) =>{
        console.log(err);
      }
    );
  }

  loadMore() {
    this.noPage++;
    if(this.noPage < this.totalPage && this.listPossibleSubTo.length > 0){

      console.log(this.noPage);
      this.getListPossibleSubscribeTo();
    }else{
      console.log("no more pages");
    }
  }

  subscribeOrUnsubscribe(usernameToFollow: string, index: number) {
    if(!this.subscriptions.get(usernameToFollow)){

      this.monitoringService
      .subscribe(this.username, usernameToFollow)
      .subscribe(() => {
        this.subscriptions.set(usernameToFollow,true);
        this.changeStyle('Unsubcribe', '#00CC66',index);
      });
      
    }else{
      this.monitoringService
      .unSubscribe(this.username, usernameToFollow)
      .subscribe(() => {
        this.subscriptions.set(usernameToFollow,false);
        this.changeStyle('Subscribe','blue', index);
      });
    }
  }
  
  changeStyle(text: string,color:string, index: number) {
    let button = this.elRef.nativeElement.querySelectorAll('button')[index];
    
    if(text == 'Unsubcribe'){
      this.renderer.removeClass(button,"text-light");
      this.renderer.addClass(button,"text-warning");
    }else{
       this.renderer.removeClass(button,"text-warning");
      this.renderer.addClass(button,"text-light");
    }
    this.renderer.setProperty(button, 'textContent', text);
  }

  isLastPage(){
    return this.noPage + 1 == this.totalPage;
  }
}
