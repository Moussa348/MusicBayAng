import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MonitoringService } from 'src/app/service/monitoring.service';
import { ProfileSubscriptionComponent } from '../profile-subscription/profile-subscription.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateRegistrationComponent } from '../update-registration/update-registration.component';
import { LikedMusic } from 'src/app/model/liked-music';
import { SharedMusic } from 'src/app/model/shared-music';
import { PurchasedMusic } from 'src/app/model/purchased-music';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),

      transition(':enter, :leave', [animate(1000)]),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  currentUserName = 'bombay'; //TODO --> get from session storage
  profileUserName = '';
  profile: Customer = new Customer();
  subscribed = false;
  likedMusics: LikedMusic[];
  sharedMusics: SharedMusic[];
  purchasedMusics: PurchasedMusic[];


  constructor(
    private customerService: CustomerService,
    private monitoringService: MonitoringService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((myMap: Params) => {
      this.profileUserName = myMap.username;
    });
    this.getProfile();
  }

  getProfile() {
    this.customerService.getProfile(this.profileUserName).subscribe(
      (data) => {
        this.profile = data;
        console.log(this.profile);
        //TODO -> check if profile is not the one that is connected
        this.monitoringService
          .checkIfSubscribeTo(this.currentUserName, this.profileUserName)
          .subscribe(
            (data) => {
              this.subscribed = data;
            },
            (err) => {
              console.log(err);
            }
          );
      },
      (err) => {
        console.log(err);
      }
    );
  }


  subscribe() {
    if (!this.subscribed) {
      this.monitoringService
        .subscribe(this.currentUserName, this.profileUserName)
        .subscribe(() => {
          this.subscribed = true;
          this.profile.nbrOfSubscriber++;
        });
      }else{
        this.monitoringService
        .unSubscribe(this.currentUserName, this.profileUserName)
        .subscribe(()=> {
          this.subscribed = false;
          this.profile.nbrOfSubscriber--;

      });
    }
  }
  
  checkIfIsYourProfile(){
    return this.currentUserName == this.profileUserName;
  }

  isSubscribedTo() {
    return this.subscribed;
  }

  isOwner() {
    return this.profileUserName == 'bombay';
  }

  openListSubscription(subType:string){
    const modalRef = this.modalService.open(ProfileSubscriptionComponent, {
      centered: true,
      scrollable: true,
    });
    modalRef.componentInstance.username = this.profileUserName;
    modalRef.componentInstance.subType = subType;
  }

  openUpdateRegistration(){
    const modalRef = this.modalService.open(UpdateRegistrationComponent, {
      centered: true,
      scrollable: true,
    });
    modalRef.componentInstance.profile = this.profile;
  }
}
