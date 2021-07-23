import { Component, OnInit } from '@angular/core';
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

  constructor(
    private notificationService:NotificationService
  ) { }

  ngOnInit(): void {
    this.getRecentNotifications();
  }

  getRecentNotifications(){
    this.notificationService.getRecentNotifications(this.username,this.noPage).subscribe(
      (data) =>{
        this.recentNotifications = data;
        console.log(this.recentNotifications);
      },(err)=>{
        console.log(err);
      }
    );
  }

}
