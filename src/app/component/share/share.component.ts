import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Music } from 'src/app/model/music';
import { MonitoringService } from 'src/app/service/monitoring.service';
import { getUsername } from 'src/app/util/jwtUtils';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  username = getUsername();
  sharingMsg;
  @Input() music:Music;

  constructor(
    public activeModal: NgbActiveModal,
    private monitoringService:MonitoringService,
    private router:Router
    ) {}

  ngOnInit(): void {
  }

  share(){
    if(this.sharingMsg){

      this.monitoringService.shareMusic(this.username,this.music.title,this.sharingMsg).subscribe(()=>this.sharingMsg="");
      this.router.navigate(['/profile/' + this.username]);
      this.activeModal.close();
    }
  }

}
