import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { FeedService } from 'src/app/service/feed.service';
import { getUsername } from 'src/app/util/jwtUtils';

@Component({
  selector: 'app-list-possible-subscribe-to',
  templateUrl: './list-possible-subscribe-to.component.html',
  styleUrls: ['./list-possible-subscribe-to.component.css']
})
export class ListPossibleSubscribeToComponent implements OnInit {
  @Input() username = getUsername();
  noPage = 0;

  listPossibleSubTo : Customer[] = new Array();

  constructor(private feedService:FeedService) { }

  ngOnInit(): void {
    this.getListPossibleSubscribeTo();
  }

  getListPossibleSubscribeTo(){
    this.feedService.getListPossibleSubscribeTo(this.username,this.noPage).subscribe(
      (data) =>{
          this.listPossibleSubTo.push.apply(this.listPossibleSubTo,data);
          console.log(this.listPossibleSubTo);
      },(err) =>{
        console.log(err);
      }
    )
  }

  loadMore(){
    this.noPage++;
    this.getListPossibleSubscribeTo();
  }

}
