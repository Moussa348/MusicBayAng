import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './component/catalog/catalog.component';
import { ConversationComponent } from './component/conversation/conversation.component';
import { Error404Component } from './component/error404/error404.component';
import { FeedComponent } from './component/feed/feed.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { UserSearchBarComponent } from './component/user-search-bar/user-search-bar.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {path:'search',component:UserSearchBarComponent},
  {path:'conversation',component:ConversationComponent,canActivate:[AuthGuardService]},
  {path:'registration',component:RegistrationComponent,canActivate:[AuthGuardService]},
  {path:'feed',component:FeedComponent,canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent},
  {path:'profile/:username',component:ProfileComponent},
  {path:'catalog',component:CatalogComponent},
  {path:'home',component:HomeComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'',redirectTo: 'welcome', pathMatch: 'full'},
  {path:'**', component:Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
