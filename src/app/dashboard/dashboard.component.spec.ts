import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewsComponent } from '../news/news.component';
import { DashboardGamesComponent } from '../dashboard-games/dashboard-games.component';
import { ReviewListComponent } from '../review-list/review-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { ReviewComponent } from '../review/review.component';
import { GameService } from '../service/game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsWriterComponent } from '../news-writer/news-writer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TagListComponent } from '../tag-list/tag-list.component';
import { TagComponent } from '../tag/tag.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommentSpoilerComponent } from '../review/comment-spoiler/comment-spoiler.component';
import { CommentComponent } from '../review/comment/comment.component';
import { BadgeComponent } from '../badge/badge.component';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent,
        NewsComponent,
        DashboardGamesComponent,
        ReviewListComponent,
        ReviewComponent,
        NewsCardComponent,
        NewsWriterComponent,
        TagListComponent,
        TagComponent,
        CommentComponent,
        CommentSpoilerComponent,
        BadgeComponent
      ],
      imports: [
        MatTabsModule,
        MatCardModule,
        MatTableModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatChipsModule,
        MatPaginatorModule,
        MatSortModule,
        //????
        MatFormFieldModule,
        FormsModule,
        MatTooltipModule
      ],
      providers: [GameService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
