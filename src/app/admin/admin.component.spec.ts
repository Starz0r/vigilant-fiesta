import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { MatRadioModule } from '@angular/material/radio';
import { ReportComponent } from '../report/report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../service/user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameComponent } from '../game/game.component';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { UserComponent } from '../user/user.component';
import { ReviewComponent } from '../review/review.component';
import { DecimalPipe } from '@angular/common';
import { DifficultyPipe } from '../pipe/difficulty.pipe';
import { RatingPipe } from '../pipe/rating.pipe';
import { ListComponent } from '../list/list.component';
import { TagListComponent } from '../tag-list/tag-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReviewListComponent } from '../review-list/review-list.component';
import { GameScreenshotsComponent } from '../game-screenshots/game-screenshots.component';
import { ReviewInputComponent } from '../review-input/review-input.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardGamesComponent } from '../dashboard-games/dashboard-games.component';
import { UserAdminControlComponent } from '../user-admin-control/user-admin-control.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { TagComponent } from '../tag/tag.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NewsWriterComponent } from '../news-writer/news-writer.component';
import { NewsCardComponent } from '../news-card/news-card.component';
import { GameService } from '../service/game.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { TagInputComponent } from '../tag-input/tag-input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserListComponent } from '../user-list/user-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommentComponent } from '../review/comment/comment.component';
import { CommentSpoilerComponent } from '../review/comment-spoiler/comment-spoiler.component';
import { SpeedrunTimerPipe } from '../pipe/speedrun-timer.pipe';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { mockCaptchaService } from '../service/user.service.spec';
import { BadgeComponent } from '../badge/badge.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import {MatSelectModule} from '@angular/material/select';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent,ReportComponent,
        GameComponent,
        UserComponent,
        ReviewComponent,
        RatingPipe,
        DifficultyPipe,
        SpeedrunTimerPipe,
        ListComponent,
        TagListComponent,
        ReviewListComponent,
        GameScreenshotsComponent,
        ReviewInputComponent,
        DashboardGamesComponent,
        UserAdminControlComponent,
        TagComponent,
        NewsWriterComponent,
        NewsCardComponent,
        TagInputComponent,
        UserListComponent,
        CommentComponent,
        CommentSpoilerComponent,
        BadgeComponent
      ],
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatCardModule,
        RouterModule,
        MatButtonModule,
        MatToolbarModule,
        NgxGalleryModule,
        MatExpansionModule,
        MatTabsModule,
        MatCheckboxModule,
        MatSliderModule,
        MatTableModule,
        MatChipsModule,
        MatIconModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatSelectModule
      ],
      providers: [UserService,
        GameService,
        DecimalPipe,
        SpeedrunTimerPipe,
        {provide: ReCaptchaV3Service, useClass: mockCaptchaService}] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
