import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Feed } from 'src/app/model/feed';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FeedService } from 'src/app/service/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),

      transition(':enter, :leave', [animate(1000)]),
    ]),
  ]
})
export class FeedComponent implements OnInit {
  username = sessionStorage.getItem('username');;
  lastDateOfCurrentFeed;
  noPage = 0;

  feed: Feed = new Feed();

  constructor(private feedService: FeedService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getFeed();
  }

  getFeed() {
    this.feedService.getFeed(this.username,this.noPage).subscribe(
      (data) =>{
        this.feed = data;
        console.log(this.feed);
      },(err) =>{
        console.log(err);
      }
    );
  }

  loadFeed() {
    this.noPage++;
    console.log(this.noPage);

    this.feedService
      .getFeed(
        this.username,
        this.noPage
      )
      .subscribe(
        (data) => {
          this.feed.likedMusics.concat(data.likedMusics);
          this.feed.sharedMusics.concat(data.sharedMusics);
          this.feed.purchasedMusics.concat(data.purchasedMusics);
          //this.feed.profiles.concat(data.profiles);
          console.log(this.feed);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
