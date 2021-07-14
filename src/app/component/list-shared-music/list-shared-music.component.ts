import { Component, Input, OnInit } from '@angular/core';
import { SharedMusic } from 'src/app/model/shared-music';
import { CustomerService } from 'src/app/service/customer.service';
import { FeedService } from 'src/app/service/feed.service';

@Component({
  selector: 'app-list-shared-music',
  templateUrl: './list-shared-music.component.html',
  styleUrls: ['./list-shared-music.component.css']
})
export class ListSharedMusicComponent implements OnInit {

  @Input() username;
  sharedMusics: SharedMusic[] = new Array();
  noPage = 0;

  constructor(private feedService:FeedService) { }

  ngOnInit(): void {
    this.getListSharedMusic();
  }

  getListSharedMusic(){
    this.feedService.getListSharedMusic(this.username,this.noPage).subscribe(
      (data) =>{
        this.sharedMusics = data;
        console.log(this.sharedMusics);
      },(err)=>{
        console.log(err);
      }
    );
  }

  isEmpty(){
    return this.sharedMusics.length ==0;
  }

}
