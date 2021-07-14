import { Component, Input, OnInit } from '@angular/core';
import { LikedMusic } from 'src/app/model/liked-music';
import { CustomerService } from 'src/app/service/customer.service';
import { FeedService } from 'src/app/service/feed.service';

@Component({
  selector: 'app-list-liked-music',
  templateUrl: './list-liked-music.component.html',
  styleUrls: ['./list-liked-music.component.css']
})
export class ListLikedMusicComponent implements OnInit {
  @Input() username;
  likedMusics: LikedMusic[] = new Array();
  noPage = 0;

  constructor(private feedService:FeedService) { }

  ngOnInit(): void {
    this.getListLikedMusic();
  }

  getListLikedMusic(){
    this.feedService.getListLikedMusic(this.username,this.noPage).subscribe(
      (data) =>{
        this.likedMusics = data;
        console.log(this.likedMusics);
      },(err)=>{
        console.log(err);
      }
    );

  }

  isEmpty(){
    return this.likedMusics.length ==0;
  }

}
