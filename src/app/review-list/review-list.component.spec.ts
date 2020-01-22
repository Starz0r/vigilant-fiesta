import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListComponent } from './review-list.component';
import { ReviewComponent } from '../review/review.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '../game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReviewListComponent', () => {
  let component: ReviewListComponent;
  let fixture: ComponentFixture<ReviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewListComponent,ReviewComponent ],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        MatCardModule,
        HttpClientTestingModule
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
