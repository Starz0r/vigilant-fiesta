import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GameService } from '../game.service';
import { TagListComponent } from '../tag-list/tag-list.component';
import { TagComponent } from '../tag/tag.component';
import { MatChipsModule } from '@angular/material/chips';
import { CommentComponent } from './comment/comment.component';
import { CommentSpoilerComponent } from './comment-spoiler/comment-spoiler.component';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ReviewComponent, 
        TagListComponent ,
        TagComponent,
        CommentComponent,
        CommentSpoilerComponent
      ],
      imports: [
        MatCardModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatChipsModule
      ],
      providers:[
        UserService,
        GameService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
