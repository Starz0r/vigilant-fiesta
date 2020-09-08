import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardGamesComponent } from '../dashboard-games/dashboard-games.component';
import { ReviewListComponent } from '../review-list/review-list.component';
import { UserAdminControlComponent } from '../user-admin-control/user-admin-control.component';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReviewComponent } from '../review/review.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameService } from '../game.service';
import { UserService } from '../user.service';
import { TagListComponent } from '../tag-list/tag-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { TagComponent } from '../tag/tag.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommentComponent } from '../review/comment/comment.component';
import { CommentSpoilerComponent } from '../review/comment-spoiler/comment-spoiler.component';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { mockCaptchaService } from '../user.service.spec';
import { BadgeComponent } from '../badge/badge.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent,
        DashboardGamesComponent,
        ReviewListComponent,
        UserAdminControlComponent,
        ReviewComponent,
        TagListComponent,
        TagComponent,
        CommentComponent,
        CommentSpoilerComponent,
        BadgeComponent
      ],
      imports: [
        MatTabsModule,
        MatTableModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatCheckboxModule,
        FormsModule,
        MatCardModule,
        HttpClientTestingModule,
        MatChipsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatFormFieldModule
      ],
      providers: [
        GameService, UserService,
        {provide: ReCaptchaV3Service, useClass: mockCaptchaService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
