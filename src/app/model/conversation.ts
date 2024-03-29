import { SentMessage } from "./sent-message";

export class Conversation {
    id:number;
    name:string;
    createdBy:string;
    creationDate:string;
    conversationType:string;
    usernames:string[] = new Array();
    sentMessages:SentMessage[] = new Array();
}
