import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Conversation } from 'src/app/model/conversation';
import { ConversationService } from 'src/app/service/conversation.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { COMPONENTS_TAGS } from 'src/app/util/constant';

@Component({
  selector: 'app-create-group-conversation',
  templateUrl: './create-group-conversation.component.html',
  styleUrls: ['./create-group-conversation.component.css']
})
export class CreateGroupConversationComponent implements OnInit {
  conversationGroup:Conversation = new Conversation();
  usernameToAdd:string;
  removable=true;
  @Input() username;
  @Output() newConversation: EventEmitter<Conversation> = new EventEmitter() ;

  constructor(
    public activeModal: NgbActiveModal,
    private conversationService:ConversationService
    ) { }

  ngOnInit(): void {
  }

  setUsernameToAdd($event){
    this.usernameToAdd = $event;
    console.log(this.usernameToAdd);
  }


  addUserInConvo($event){
    if(!this.conversationGroup.usernames.includes($event)){
      this.conversationGroup.usernames.push($event);
    }
    console.log(this.conversationGroup.usernames);
  }


  getComponentTag(){
    return COMPONENTS_TAGS[1];
  }

  remove(username: string): void {
    const index = this.conversationGroup.usernames.indexOf(username);

    if (index >= 0) {
      this.conversationGroup.usernames.splice(index, 1);
      console.log(this.conversationGroup.usernames);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.conversationGroup.usernames.push(event.option.viewValue);
  }
  createGroupConv(){
    this.conversationGroup.createdBy = this.username;
    this.conversationGroup.conversationType = 'GROUP';
    this.conversationService.createConversation(this.conversationGroup).subscribe(
      (data) =>{
        if(data != null){
          console.log(data);
          this.newConversation.emit(data);
          this.activeModal.close();
        }
      },(err)=>{
        console.log(err);
      }
    );
  }


}
