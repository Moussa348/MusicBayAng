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
import { getUsername } from 'src/app/util/jwtUtils';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  username = getUsername();
  filter = new FormControl('');
  
  lastSentMessages: SentMessage[] = window.history.state.data;
  lastSentMessages$: Observable<SentMessage[]>;
  conversation:Conversation = new Conversation();
  newlySentMessage: SentMessage = new SentMessage();
  noPage = 0;

  constructor(
    private conversationService:ConversationService,
    private modalService: NgbModal,
    private route : ActivatedRoute
  ) { 
    this.lastSentMessages$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) =>  this.search(text))
    );
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((myMap : Params) => {
      this.conversation.id = myMap.id;
      console.log(this.conversation.id);
      this.getMessagesFromConversation(this.conversation.id);
    }); 
    console.log(this.lastSentMessages.length);
  }

  search(text: string): SentMessage[] {
    return this.lastSentMessages.filter((lastSentMessage) => {
      const term = text !=null ?text.toLowerCase():'';
      return (lastSentMessage.conversationName.toLowerCase().includes(term.toLowerCase()));
    });
  }

  isConversationGroup(index:number){
    return this.lastSentMessages[index].conversationType.toLowerCase() == 'group';
  }

  getMessagesFromConversation(id:number){
    this.conversationService.getMessagesFromConversation(id,this.noPage).subscribe(
      (data) =>{
        if(this.noPage == 0){
          this.conversation = data;
          return;
        }
        else if(this.conversation.id != data.id){
          this.noPage = 0;
          this.conversation = data;
          return;
        }
        else{
          this.conversation.sentMessages.push.apply(this.conversation.sentMessages,data.sentMessages);
        }
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

  isMe(sentMessage:SentMessage){
    return sentMessage.sendBy == this.username;
  }

  sendMessage(){
    this.newlySentMessage.conversationId = this.conversation.id;
    this.newlySentMessage.sendBy = this.username;
    this.conversationService.sendMessageInConversation(this.newlySentMessage).subscribe(
      (data) =>{
        if(data !=null){

          this.conversation.sentMessages.push(data);
          console.log(data);
          this.newlySentMessage.content = '';
        }
      },(err) =>{
        console.log(err);
      }
    )
  }

}
