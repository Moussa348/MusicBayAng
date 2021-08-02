import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Customer } from 'src/app/model/customer';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-search-bar',
  templateUrl: './user-search-bar.component.html',
  styleUrls: ['./user-search-bar.component.css'],
})
export class UserSearchBarComponent implements OnInit {
  @Input() username = 'bombay'; //passe input after testing
  noPage = 0;

  profils: Customer[] = new Array();

  constructor(private userService: UserService,private router:Router) {}

  ngOnInit(): void {
  }

  public model: Customer;

  formatter = (username: string) => username.toLowerCase();


  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.profils
              .filter(
                (profil) => profil.username.indexOf(term.toLowerCase()) > -1
              ).map((profil) => profil.username)
              .slice(0, 10)
      )
    );

  getListProfileSearch() {
    this.userService.getListProfileSearch().subscribe(
      (data) => {
        this.profils = data;
        console.log(this.profils);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goToProfile($event){
   //this.router.navigate(['/profile',$event.target.value]);
   window.location.replace('http://localhost:5001/profile/' + $event.target.value );
  }
}
