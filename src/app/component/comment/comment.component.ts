import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from 'src/app/service/comment.service';
import { Comment } from '../../model/comment';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() title;
  username = 'bombay';
  comments: Comment[] = new Array();
  isCollapsed = false;
  comment: Comment = new Comment();
  noPage = 0;


  constructor(
    public activeModal: NgbActiveModal,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListCommentOfMusic();
  }

  getListCommentOfMusic() {
    this.commentService.getListCommentOfMusic(this.title,this.noPage).subscribe(
      (data) => {
        this.comments = data;
        console.log(this.comments);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadMoreComments(){
    
  }

  increaseOrDecreaseLike(id: number) {
    let isLiked = this.commentIsLiked(id);

    if (isLiked == true) {
      console.log('unlike comment');

      this.commentService.decreaseLike(id, this.username).subscribe(
        (data) => {
          this.comments = this.comments.map((comment) =>
            comment.id == id ? data : comment
          );
          console.log(this.comments);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('like comment');

      this.commentService.increaseLike(id, this.username).subscribe(
        (data) => {
          this.comments = this.comments.map((comment) =>
            comment.id == id ? data : comment
          );
          console.log(this.comments);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  commentIsLiked(id: number) {
    let comment = this.comments.find((comment) => comment.id == id);

    return comment.likedBys.find((likedBy) => likedBy == this.username) !=
      undefined
      ? true
      : false;
  }

  postComment(){
    this.comment.sendBy = this.username;
    this.comment.nbrLike = 0;
    console.log(this.comment.content);

    this.commentService.postComment(this.comment,this.title).subscribe(
      (data) =>{
        this.comment.content = "";
        this.comments.push(data);
      },
      (err) => {
        console.log(err);
      }
    );

  }

  collapsed() {
    return this.isCollapsed;
  }

  goToProfile(username:string){
    this.router.navigate(['profile/',username]);
    this.activeModal.close();
  }
}
