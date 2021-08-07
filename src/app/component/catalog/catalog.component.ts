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
import { Observable, of } from 'rxjs';
import { Music } from 'src/app/model/music';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

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
  username = getUsername();
  sounds: HTMLAudioElement[];
  tabPaginations;
  nbrOfPage$: Observable<number>;
  musics$: Observable<Music[]>;
  noPage = 0;
  noPageShow = 1;
  filter = new FormControl('');

  constructor(
    private musicService: MusicService,
    private monitoringService: MonitoringService,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {
    this.musics$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) =>  this.search(text, datePipe))
    );
  }

  ngOnInit(): void {
    //this.nbrOfPage$ = this.musicService.getNbrOfPage();
    this.getNbrOfPage();
    this.getCatalog();
  }

  search(text: string, datePipe: DatePipe): Music[] {
    this.musics$ = of(new Array());
    return this.catalog.musics.filter((music) => {
      const term = text.toLowerCase();
      return (
        music.title.toLowerCase().includes(term) ||
        music.tags.toLowerCase().includes(term)
      );
    });
  }

  getCatalog() {
    if (this.username != null) {
      this.musicService.getCatalog(this.username, this.noPage).subscribe(
        (data) => {
          
          if(data.musics.length > 0){
            this.catalog = data;
            this.musics$ = of(data.musics);
            this.setSoundPlayings(this.catalog.musics.length);
          }
          console.log(this.catalog);
        },
        (err) => {
          console.log(err);
        }
        );
      } else {
      this.musicService.getListMusic(this.noPage).subscribe(
        (data) => {
          if(data.length > 0){
            this.catalog.musics = data;
            this.musics$ = of(data);
            this.setSoundPlayings(this.catalog.musics.length);
          }
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.filter.reset();
  }

  loadMore($event : PageEvent,musics:Music[]) {
    this.noPage = $event.pageIndex;
    this.getCatalog();
    console.log(musics);
  }

  getNbrOfPage() {
    this.musicService.getNbrOfPage().subscribe(
      (data) => {
        this.tabPaginations = new Array(data);
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setSoundPlayings(length: number) {
    this.sounds = new Array(length);

    for (let i = 0; i < this.sounds.length; i++) {
      this.sounds[i] = new Audio();
    }

    console.log(this.sounds);
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
    return this.catalog.sharedMusicTitles != null
      ? this.catalog.sharedMusicTitles.find(
          (sharedMusicTitle) => sharedMusicTitle == title
        )
      : false;
  }

  isLiked(title: string) {
    return this.catalog.likedMusicTitles
      ? this.catalog.likedMusicTitles.find(
          (likedMusicTitle) => likedMusicTitle == title
        )
      : false;
  }

  openComment(title: string) {
    const modalRef = this.modalService.open(CommentComponent, {
      centered: true,
      scrollable: true,
    });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.username = this.username;
    modalRef.componentInstance.nbComment.subscribe((nbComment) => {
      this.catalog.musics.find((music) => music.title == title).nbrOfComment =
        nbComment;
    });
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

  play(index: number, title: string) {
    const sound = this.sounds[index];

    if (!sound.src) {
      console.log(sound);
      //Put title with + .mp3
      //Maybe add a method that checks if there is any file to load -> in spring
      sound.src = 'http://localhost:4444/file/play/Hope.mp3';
      sound.load();
      this.stopOthers();
      console.log('PLAY FOR FIRST TIME');
      sound.play();
      return;
    }

    if (sound.src && !sound.paused) {
      console.log('PAUSE');
      sound.pause();
      return;
    }

    if (sound.src && sound.paused) {
      console.log('PLAYING AFTER BEING PAUSED');
      this.stopOthers();
      sound.play();
      return;
    }
  }

  replay(index: number) {
    const sound = this.sounds[index];
    if (!sound.paused) {
      sound.currentTime = 0;
      sound.play();
    }

    //setTime
  }

  setNbrComments($event, index: number) {
    this.catalog.musics[index].nbrOfComment = $event;
  }

  stopOthers() {
    for (let i = 0; i < this.sounds.length; i++) {
      const sound = this.sounds[i];
      if (!sound.paused) {
        sound.pause();
        sound.currentTime = 0;
      }
    }
  }

  isPaused(index: number) {
    return this.sounds[index]?this.sounds[index].paused:false;
  }

  isLoggedIn() {
    return this.username != null;
  }
}
