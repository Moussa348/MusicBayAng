import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ConversationService } from 'src/app/service/conversation.service';
import { UserService } from 'src/app/service/user.service';
import { COMPONENTS_TAGS } from 'src/app/util/constant';
import { getUsername } from 'src/app/util/jwtUtils';

@Component({
  selector: 'app-list-user-in-convo',
  templateUrl: './list-user-in-convo.component.html',
  styleUrls: ['./list-user-in-convo.component.css']
})
export class ListUserInConvoComponent implements OnInit {
  username = getUsername();
  @Input() conversationId ;
  @Input() creator;
  @Input() usernames:string[] = new Array();
  searchedUsername:string;
  formatter = (username: string) => username.toLowerCase();

  constructor(
    public activeModal: NgbActiveModal,
    private conversationService:ConversationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    console.log(this.usernames);
  }

  removeUserFromConversationGroup(index:number){
    this.conversationService.removeUserFromConversationGroup(this.conversationId,this.usernames[index]).subscribe(() => this.usernames.splice(index,1));
  }

  isCreator(){
    return this.username == this.creator;
  }

  showCreatorFlag(username:string){
    return username == this.creator;
  }

  addUserInConvo(){
    this.conversationService.addUserInConversationGroup(this.conversationId,this.searchedUsername).subscribe(() => this.usernames.push(this.searchedUsername));
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.usernames
              .filter(
                (username) => username.indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

    getComponentTag(){
      return COMPONENTS_TAGS[1];
    }

    setSearchedUsername($event){
      this.searchedUsername = $event;
    }

    goToProfile(username){
      this.router.navigate(['/profile',username])
      this.activeModal.close();
    }

}
