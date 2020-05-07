import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListPageComponent } from './review-list-page.component';
import { ReviewListComponent } from '../review-list/review-list.component';
import { TagListComponent } from '../tag-list/tag-list.component';
import { ReviewComponent } from '../review/review.component';
import { TagComponent } from '../tag/tag.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatChipsModule } from '@angular/material/chips';
import { GameService } from '../game.service';
import { CommentComponent } from '../review/comment/comment.component';
import { CommentSpoilerComponent } from '../review/comment-spoiler/comment-spoiler.component';
import { BadgeComponent } from '../badge/badge.component';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ReviewListPageComponent', () => {
  let component: ReviewListPageComponent;
  let fixture: ComponentFixture<ReviewListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ReviewListPageComponent,
        ReviewListComponent,
        ReviewComponent,
        TagListComponent,
        TagComponent,
        CommentComponent,
        CommentSpoilerComponent,
        BadgeComponent
       ],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        MatCardModule,
        HttpClientTestingModule,
        MatChipsModule,
        MatTooltipModule
      ],
      providers: [
        GameService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
