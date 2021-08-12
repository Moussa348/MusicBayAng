import { state } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SentMessage } from 'src/app/model/sent-message';
import { ConversationService } from 'src/app/service/conversation.service';

@Component({
  selector: 'app-list-last-sent-message',
  templateUrl: './list-last-sent-message.component.html',
  styleUrls: ['./list-last-sent-message.component.css']
})
export class ListLastSentMessageComponent implements OnInit {
  @Input()username = "bombay";
  noPage = 0;
  lastSentMessages:SentMessage[] = new Array();

  constructor(
    private conversationService:ConversationService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getLastSentMessages();
  }

  getLastSentMessages(){
    this.conversationService.getLastSentMessages(this.username,this.noPage).subscribe(
      (data) =>{
        this.lastSentMessages.push.apply(this.lastSentMessages, data);
        console.log(this.lastSentMessages);
      },(err) =>{
        console.log(err);
      }
    );
  }

  loadMore(){
    this.noPage++;
    this.getLastSentMessages();
  }
  
  goToConversation(){
    this.router.navigate(['/conversation'],{state:{data:this.lastSentMessages}});
  }

  isConversationGroup(index:number){
    return this.lastSentMessages[index].conversationType.toLowerCase() == 'group';
  }

}
