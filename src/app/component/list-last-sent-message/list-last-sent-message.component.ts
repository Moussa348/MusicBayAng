import { Component, Input, OnInit } from '@angular/core';
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
  sentMessages:SentMessage[] = new Array();

  constructor(private conversationService:ConversationService) { }

  ngOnInit(): void {
    this.getLastSentMessages();
  }

  getLastSentMessages(){
    this.conversationService.getLastSentMessages(this.username,this.noPage).subscribe(
      (data) =>{
        this.sentMessages.push.apply(this.sentMessages, data);
        console.log(this.sentMessages);
      },(err) =>{
        console.log(err);
      }
    );
  }

  loadMore(){
    this.noPage++;
    this.getLastSentMessages();
  }

}
