import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-update-registration',
  templateUrl: './update-registration.component.html',
  styleUrls: ['./update-registration.component.css']
})
export class UpdateRegistrationComponent implements OnInit {
  @Input() profile: Customer;
  registrationForm: FormGroup;
  selectedFile:File;

  constructor(
    public activeModal: NgbActiveModal,
    private customerService:CustomerService,
    private router:Router
  ) { }

  ngOnInit(): void {
    console.log(this.profile);
    this.setRegistrationForm();
  }

  setRegistrationForm() {
    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      biography: new FormControl('', Validators.required),
      password: new FormControl(''),
      passwordAgain: new FormControl(''),
      updatePassword: new FormControl('')
    });
  }

  onFileChanged($event){
    this.selectedFile = $event.target.files[0];
  }

  updateCustomer(){
    if(this.registrationForm.valid){
      this.profile.username = this.registrationForm.get('username').value
      this.profile.biography = this.registrationForm.get('biography').value;
      this.profile.city = this.registrationForm.get('city').value;
      
      if(this.registrationForm.get('updatePassword').value==true){
        this.profile.password = this.registrationForm.get('password').value;
      }
      //const uploadImageData = new FormData();
      
      //uploadImageData.append('picture',this.selectedFile,this.selectedFile.name);
      
      console.log(this.profile);
      //console.log(this.selectedFile);
      
      this.customerService.updateCustomer(this.profile).subscribe(
        (data) => {
          this.profile = data;
          console.log(this.profile);
          this.router.navigate(['/profile',this.profile.username]);
          this.activeModal.close();
        },(err) => {
          console.log(err);

        }
      );
    }
  }

}
