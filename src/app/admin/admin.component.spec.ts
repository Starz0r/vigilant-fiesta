import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { MatRadioModule } from '@angular/material/radio';
import { ReportComponent } from '../report/report.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameComponent } from '../game/game.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { UserComponent } from '../user/user.component';
import { ReviewComponent } from '../review/review.component';
import { DecimalPipe } from '@angular/common';
import { DifficultyPipe } from '../difficulty.pipe';
import { RatingPipe } from '../rating.pipe';
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
import { GameService } from '../game.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { TagInputComponent } from '../tag-input/tag-input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
        TagInputComponent
      ],
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        FormsModule,
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
        MatFormFieldModule,
        MatTableModule,
        MatChipsModule,
        MatIconModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatInputModule,
        MatDatepickerModule
      ],
      providers: [UserService,
        GameService,
        DecimalPipe]
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
