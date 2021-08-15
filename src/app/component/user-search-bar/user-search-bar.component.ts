import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Customer } from 'src/app/model/customer';
import { UserService } from 'src/app/service/user.service';
import { COMPONENTS_TAGS } from 'src/app/util/constant';

@Component({
  selector: 'app-user-search-bar',
  templateUrl: './user-search-bar.component.html',
  styleUrls: ['./user-search-bar.component.css'],
})
export class UserSearchBarComponent implements OnInit {
  @Input() username = 'bombay';
  @Input() componentTag ;
  noPage = 0;

  usernames:string[] = new Array();

  searchedUsername:string;
  @Output() searchedUsername$: EventEmitter<string> = new EventEmitter();

  constructor(private userService: UserService,private router:Router) {}

  ngOnInit(): void {
  }


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
          : this.usernames
              .filter(
                (username) => username.indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  getListProfileSearch() {
    this.userService.getListProfileSearch().subscribe(
      (data) => {
        this.usernames =data.map(profile => profile.username);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goToProfile($event){
   //this.router.navigate(['/profile',$event.target.value]);
   if(this.componentTag == COMPONENTS_TAGS[0]){
     window.location.replace('http://localhost:5001/profile/' + $event.target.value );
    }
    if(this.componentTag == COMPONENTS_TAGS[1]){
      console.log($event.target.value);
      this.searchedUsername$.emit($event.target.value);
    }
  }

  getComponentTag(){
    return COMPONENTS_TAGS[0];
  }
}
