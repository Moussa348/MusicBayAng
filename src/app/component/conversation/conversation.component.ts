import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { SentMessage } from 'src/app/model/sent-message';
import { Conversation } from 'src/app/model/conversation';
import { ConversationService } from 'src/app/service/conversation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListUserInConvoComponent } from '../list-user-in-convo/list-user-in-convo.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),

      transition(':enter, :leave', [animate(1000)]),
    ]),
    trigger('collapse',[
      state('false', style({ opacity: 1 })),
      state('true', style({ opacity: 0 })),

      transition('false <=> true', [animate(1000)])
    
    ])
  ],
})
export class ConversationComponent implements OnInit {
  filter = new FormControl('');
  lastSentMessages: SentMessage[] = window.history.state.data;
  conversation:Conversation = new Conversation();
  noPage = 0;

  constructor(
    private conversationService:ConversationService,
    private modalService: NgbModal
  ) { 
  }
  
  ngOnInit(): void {
    this.getMessagesFromConversation(this.lastSentMessages[0].conversationId);
    console.log(this.lastSentMessages.length);
  }

  isConversationGroup(index:number){
    return this.lastSentMessages[index].conversationType.toLowerCase() == 'group';
  }

  getMessagesFromConversation(id:number){
    this.conversationService.getMessagesFromConversation(id,this.noPage).subscribe(
      (data) =>{
        if(this.conversation.id != data.id){
          this.noPage = 0;
        }
        if(this.noPage == 0){
          this.conversation = data;
        }
        this.conversation.sentMessages.push.apply(this.conversation.sentMessages,data);
        console.log(this.conversation);
      }
    );
  }

  loadMore(){
    this.noPage++;
    this.getMessagesFromConversation(this.conversation.id);
  }


  openListUserConvo() {
    const modalRef = this.modalService.open(ListUserInConvoComponent, {
      centered: true,
      scrollable: true,
    });

    modalRef.componentInstance.usernames = this.conversation.usernames;
    modalRef.componentInstance.conversationId = this.conversation.id;
    modalRef.componentInstance.creator = this.conversation.createdBy;
  }

}
