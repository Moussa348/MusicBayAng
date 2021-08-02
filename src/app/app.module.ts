import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {MatRippleModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAlertConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { Error404Component } from './component/error404/error404.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { NavComponent } from './component/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CatalogComponent } from './component/catalog/catalog.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FeedComponent } from './component/feed/feed.component';
import { CommentComponent } from './component/comment/comment.component';
import { ShareComponent } from './component/share/share.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileSubscriptionComponent } from './component/profile-subscription/profile-subscription.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { UpdateRegistrationComponent } from './component/update-registration/update-registration.component';
import { CartComponent } from './component/cart/cart.component';
import { AddingCartArticleComponent } from './component/adding-cart-article/adding-cart-article.component';
import { ListLikedMusicComponent } from './component/list-liked-music/list-liked-music.component';
import { ListSharedMusicComponent } from './component/list-shared-music/list-shared-music.component';
import { ListPurchasedMusicComponent } from './component/list-purchased-music/list-purchased-music.component';
import { DatePipe } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { ALLOWED_URLS, STORAGE_KEY } from './util/constant';
import { NotificationComponent } from './component/notification/notification.component';
import { ConversationComponent } from './component/conversation/conversation.component';
import { UserSearchBarComponent } from './component/user-search-bar/user-search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    Error404Component,
    HomeComponent,
    NavComponent,
    CatalogComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    FeedComponent,
    CommentComponent,
    ShareComponent,
    ProfileSubscriptionComponent,
    RegistrationComponent,
    UpdateRegistrationComponent,
    CartComponent,
    AddingCartArticleComponent,
    ListLikedMusicComponent,
    ListSharedMusicComponent,
    ListPurchasedMusicComponent,
    NotificationComponent,
    ConversationComponent,
    UserSearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatGridListModule,
    MatDialogModule,
    MatRippleModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: () => {
          return sessionStorage.getItem(STORAGE_KEY);
        },
        allowedDomains:ALLOWED_URLS
      },
    }),
  ],
  providers: [DatePipe,NgbAlertConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
