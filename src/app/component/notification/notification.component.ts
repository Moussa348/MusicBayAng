import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { RecentNotification } from 'src/app/model/recent-notification';
import { NotificationService } from 'src/app/service/notification.service';
import { getUsername } from 'src/app/util/jwtUtils';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  username = getUsername();
  noPage =0;
  recentNotifications:RecentNotification[] = new Array();
  totalPage = 0;
  @Output() isOpen = new EventEmitter();

  constructor(
    private notificationService:NotificationService
  ) { }

  ngOnInit(): void {
    this.getNbrOfPage();
    this.getRecentNotifications();
    this.isOpen.emit(true);
  }

  getRecentNotifications(){
    this.notificationService.getRecentNotifications(this.username,this.noPage).subscribe(
      (data) =>{
        this.recentNotifications.push.apply(this.recentNotifications, data);
        console.log(this.recentNotifications);
      },(err)=>{
        console.log(err);
      }
    );
  }

  loadMoreNotifications(){
    this.noPage++;
    this.getRecentNotifications();
  }

  getNbrOfPage(){
    this.notificationService.getNbrOfPage(this.username).subscribe(
      (data)=>{
        this.totalPage = data;
        console.log(this.totalPage);
      },(err)=>{
        console.log(err);
      }
    );
  }

  isLastPage() {
    return this.noPage + 1 == this.totalPage;
  }
  
  hasNotifications(){
    return this.recentNotifications.length > 0;
  }

}
