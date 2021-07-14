import { Component, Input, OnInit } from '@angular/core';
import { PurchasedMusic } from 'src/app/model/purchased-music';
import { CustomerService } from 'src/app/service/customer.service';
import { FeedService } from 'src/app/service/feed.service';

@Component({
  selector: 'app-list-purchased-music',
  templateUrl: './list-purchased-music.component.html',
  styleUrls: ['./list-purchased-music.component.css']
})
export class ListPurchasedMusicComponent implements OnInit {

  @Input() username;
  purchasedMusics: PurchasedMusic[] = new Array();
  noPage = 0;

  constructor(private feedService:FeedService) { }

  ngOnInit(): void {
    this.getListPurchasedMusic();
  }

  getListPurchasedMusic(){
    this.feedService.getListPurchasedMusic(this.username,this.noPage).subscribe(
      (data) =>{
        this.purchasedMusics = data;
        console.log(this.purchasedMusics);
      },(err)=>{
        console.log(err);
      }
    );
  }

  isEmpty(){
    return this.purchasedMusics.length ==0;
  }

}
