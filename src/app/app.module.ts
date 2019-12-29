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

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { ReviewInputComponent } from './review-input/review-input.component';
import { DifficultyPipe } from './difficulty.pipe';
import { RatingPipe } from './rating.pipe';
import { DecimalPipe } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    TagListComponent,
    ReviewInputComponent,
    DifficultyPipe,
    RatingPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    MessageService, GameService, UserService,
    DecimalPipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
