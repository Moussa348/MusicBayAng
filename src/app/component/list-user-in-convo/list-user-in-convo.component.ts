import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConversationService } from 'src/app/service/conversation.service';
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

  constructor(
    public activeModal: NgbActiveModal,
    private conversationService:ConversationService
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

}
