import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './component/catalog/catalog.component';
import { Error404Component } from './component/error404/error404.component';
import { FeedComponent } from './component/feed/feed.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

const routes: Routes = [
  {path:'registration',component:RegistrationComponent},
  {path:'feed',component:FeedComponent},
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
