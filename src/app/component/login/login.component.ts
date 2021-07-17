import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/service/auth.service';
import { AuthGuardService } from 'src/app/service/auth-guard.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),

      transition(':enter, :leave', [animate(1000)]),
    ]),
  ]
})
export class LoginComponent implements OnInit {

  authFormGroup: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private authGuardService:AuthGuardService
  ) {}

  ngOnInit(): void {
    this.setAuthFormGroup();
  }

  setAuthFormGroup() {
    this.authFormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.authFormGroup.valid) {
      this.authenticationService
        .login(
          this.authFormGroup.get('username').value,
          this.authFormGroup.get('password').value
        )
        .subscribe(
          (data) => {
            if (data != null) {
              this.openSnackBar('Welcome ' + data.username  + '!', 'DISMISS');
              this.authGuardService.login(data);
              this.router.navigate(['/profile',data.username]);
            } else {
              this.openSnackBar('Wrong email or password', 'DISMISS');
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  isLoggedIn() {
    return this.authGuardService.isLoggedIn();
  }

  logout() {
    this.authGuardService.logout();
    this.openSnackBar('Till next time!', 'DISMISS');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center'
    });
  }

}
