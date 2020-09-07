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
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { ReportComponent } from './report/report.component';
import { SpecialThanksComponent } from './special-thanks/special-thanks.component';
import { UserAdminControlComponent } from './user-admin-control/user-admin-control.component';
import { NewsComponent } from './news/news.component';
import { GameScreenshotsComponent } from './game-screenshots/game-screenshots.component';
import { NewsWriterComponent } from './news-writer/news-writer.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { SubmitComponent } from './submit/submit.component';
import { ScreenshotAddDialogComponent } from './screenshot-add-dialog/screenshot-add-dialog.component';
import { DragDropDirective } from './drag-drop.directive';
import { UserListComponent } from './user-list/user-list.component';
import { ReviewListPageComponent } from './review-list-page/review-list-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ScreenshotMgmtComponent } from './screenshot-mgmt/screenshot-mgmt.component';
import { SpeedrumComService } from './speedrum-com.service';
import { SpeedrunTimerPipe } from './speedrun-timer.pipe';
import { CommentComponent } from './review/comment/comment.component';
import { CommentSpoilerComponent } from './review/comment-spoiler/comment-spoiler.component';
import { BadgeComponent } from './badge/badge.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { CaptchaNoticeComponent } from './captcha-notice/captcha-notice.component';
import { environment } from '../environments/environment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    GameComponent,
    GamesComponent,
    ReviewComponent,
    CommentComponent,
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
    RatingPipe,
    RegisterDialogComponent,
    FooterComponent,
    AdminComponent,
    ReportComponent,
    SpecialThanksComponent,
    UserAdminControlComponent,
    NewsComponent,
    GameScreenshotsComponent,
    NewsWriterComponent,
    NewsCardComponent,
    TagInputComponent,
    GuidelinesComponent,
    SubmitComponent,
    ScreenshotAddDialogComponent,
    DragDropDirective,
    UserListComponent,
    ReviewListPageComponent,
    ForgotPasswordDialogComponent,
    PasswordResetComponent,
    ScreenshotMgmtComponent,
    SpeedrunTimerPipe,
    CommentSpoilerComponent,
    BadgeComponent,
    CaptchaNoticeComponent
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
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatExpansionModule,
    MatRadioModule,
    MatTabsModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    RecaptchaV3Module,
    MatAutocompleteModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    MessageService, GameService, UserService, SpeedrumComService, 
    DecimalPipe, SpeedrunTimerPipe,
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captcha_key },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegisterDialogComponent,
    ScreenshotAddDialogComponent,
    ForgotPasswordDialogComponent
  ]
})
export class AppModule { }
