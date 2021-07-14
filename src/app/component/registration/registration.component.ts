import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),

      transition(':enter, :leave', [animate(1000)]),
    ]),
  ]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  customer: Customer = new Customer();
  registered = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setRegistrationForm();
  }

  setRegistrationForm() {
    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordAgain: new FormControl('', Validators.required),
    });
  }

  createCustomer() {
    this.customer.username = this.registrationForm.get('username').value;
    this.customer.email = this.registrationForm.get('email').value;
    this.customer.password = this.registrationForm.get('password').value;

    console.log(this.customer);
    if (this.registrationForm.valid) {
      console.log(this.customer);

      this.customerService.createCustomer(this.customer).subscribe((data) => {
        this.registered = data;
        if (this.registered) {
          this.router.navigate(['/login']);
        }
      });
    }
  }

  validateSamePassword() {
    return (
      this.registrationForm.get('password').value ==
      this.registrationForm.get('passwordAgain').value
    );
  }
}
