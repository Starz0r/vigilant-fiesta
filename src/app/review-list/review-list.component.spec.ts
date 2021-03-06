import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListComponent } from './review-list.component';
import { ReviewComponent } from '../review/review.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '../service/game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TagListComponent } from '../tag-list/tag-list.component';
import { TagComponent } from '../tag/tag.component';
import { MatChipsModule } from '@angular/material/chips';
import { CommentComponent } from '../review/comment/comment.component';
import { CommentSpoilerComponent } from '../review/comment-spoiler/comment-spoiler.component';
import { BadgeComponent } from '../badge/badge.component';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ReviewListComponent', () => {
  let component: ReviewListComponent;
  let fixture: ComponentFixture<ReviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
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
    fixture = TestBed.createComponent(ReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
