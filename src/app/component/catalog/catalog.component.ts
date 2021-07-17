import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MusicService } from 'src/app/service/music.service';
import { MonitoringService } from 'src/app/service/monitoring.service';
import { Catalog } from 'src/app/model/catalog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentComponent } from '../comment/comment.component';
import { ShareComponent } from '../share/share.component';
import { AddingCartArticleComponent } from '../adding-cart-article/adding-cart-article.component';
import { DatePipe } from '@angular/common';
import { getUsername } from 'src/app/util/jwtUtils';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),

      transition(':enter, :leave', [animate(1000)]),
    ]),
  ],
})
export class CatalogComponent implements OnInit {
  catalog: Catalog = new Catalog();
  username = sessionStorage.getItem('username');
  stop = false;
  noPage = 0;

  constructor(
    private musicService: MusicService,
    private monitoringService: MonitoringService,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    console.log(this.username);
    this.getCatalog();
  }

  getCatalog() {
    if (this.username != null) {
      this.musicService.getCatalog(this.username,this.noPage).subscribe(
        (data) => {
          this.catalog = data;
          console.log(this.catalog);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.musicService.getListMusic(this.noPage).subscribe(
        (data) => {
          this.catalog.musics = data;
          console.log(this.catalog.musics);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  likeOrUnlike(username: string, title: string) {
    const index = this.catalog.likedMusicTitles.indexOf(title);

    if (this.isLiked(title)) {
      this.monitoringService.unLikeMusic(username, title).subscribe();

      this.catalog.likedMusicTitles.splice(index);

      this.catalog.musics.forEach((music) => {
        if (music.title == title && music.nbrOfLike > 0) {
          music.nbrOfLike--;
          return;
        }
      });
    } else {
      this.monitoringService.likeMusic(username, title).subscribe();

      this.catalog.likedMusicTitles.push(title);

      this.catalog.musics.forEach((music) => {
        if (music.title == title) {
          music.nbrOfLike++;
          return;
        }
      });
    }
    console.log(this.catalog.likedMusicTitles);
  }

  isShared(title: string) {
    return this.catalog.sharedMusicTitles != null?this.catalog.sharedMusicTitles.find(
      (sharedMusicTitle) => sharedMusicTitle == title
    ):false;
  }

  isLiked(title: string) {
    return this.catalog.likedMusicTitles? this.catalog.likedMusicTitles.find(
      (likedMusicTitle) => likedMusicTitle == title
    ):false;
  }

  openComment(title: string) {
    const modalRef = this.modalService.open(CommentComponent, {
      centered: true,
      scrollable: true,
    });

    modalRef.componentInstance.title = title;
  }

  openShare(title: string) {
    const music = this.catalog.musics.find((music) => music.title == title);

    if (!this.isShared(title)) {
      const modalRef = this.modalService.open(ShareComponent, {
        centered: true,
        scrollable: true,
      });

      modalRef.componentInstance.music = music;
    } else {
      const index = this.catalog.likedMusicTitles.indexOf(title);

      this.monitoringService.unShareMusic(this.username, title).subscribe();

      this.catalog.sharedMusicTitles.splice(index);

      this.catalog.musics.forEach((music) => {
        if (music.title == title && music.nbrOfShare > 0) {
          music.nbrOfShare--;
          return;
        }
      });
      //window.location.reload();
    }
  }

  openAddingArticle(title: string, basicPrice: number, exclusivePrice: number) {
    const modalRef = this.modalService.open(AddingCartArticleComponent, {
      centered: true,
      scrollable: true,
    });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.basicPrice = basicPrice;
    modalRef.componentInstance.exclusivePrice = exclusivePrice;
  }

  play() {
    return this.stop;
  }
}
