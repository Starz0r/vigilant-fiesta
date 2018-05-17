import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameComponent } from './game/game.component';

import { GameService } from './game.service';
import { GamesComponent } from './games/games.component';

import { UserService } from './user.service';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';
import { ReviewComponent } from './review/review.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ListComponent } from './list/list.component';
import { DashboardGamesComponent } from './dashboard-games/dashboard-games.component';

import { TokenInterceptor } from './token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TagComponent } from './tag/tag.component';
import { TagListComponent } from './tag-list/tag-list.component';

import { MatChipsModule, MatCheckboxModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    GameComponent,
    GamesComponent,
    ReviewComponent,
    HeaderComponent,
    LoginComponent,
    UserComponent,
    ReviewListComponent,
    ListComponent,
    DashboardGamesComponent,
    TagComponent,
    TagListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    MessageService, GameService, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
