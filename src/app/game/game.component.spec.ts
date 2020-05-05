import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { DecimalPipe } from '@angular/common';
import { DifficultyPipe } from '../difficulty.pipe';
import { RatingPipe } from '../rating.pipe';
import { ListComponent } from '../list/list.component';
import { TagListComponent } from '../tag-list/tag-list.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReviewInputComponent } from '../review-input/review-input.component';
import { ReviewListComponent } from '../review-list/review-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReviewComponent } from '../review/review.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '../game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { GameScreenshotsComponent } from '../game-screenshots/game-screenshots.component';
import { TagComponent } from '../tag/tag.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TagInputComponent } from '../tag-input/tag-input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommentComponent } from '../review/comment/comment.component';
import { CommentSpoilerComponent } from '../review/comment-spoiler/comment-spoiler.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent,
        DifficultyPipe,
        RatingPipe,
        ListComponent,
        TagListComponent,
        ReviewInputComponent,
        ReviewListComponent,
        ReviewComponent,
        GameScreenshotsComponent,
        TagComponent,
        TagInputComponent,
        CommentComponent,
        CommentSpoilerComponent
      ],
      imports: [
        NgxGalleryModule,MatExpansionModule,
        MatCheckboxModule,
        FormsModule,
        MatSliderModule,
        MatFormFieldModule,
        RouterTestingModule,
        MatCardModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatChipsModule,
        MatIconModule,
        MatDatepickerModule
      ],
      providers: [
        DecimalPipe,
        GameService,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
