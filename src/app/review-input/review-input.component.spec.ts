import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewInputComponent } from './review-input.component';
import { DecimalPipe } from '@angular/common';
import { DifficultyPipe } from '../difficulty.pipe';
import { RatingPipe } from '../rating.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameService } from '../game.service';
import { UserService } from '../user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

describe('ReviewInputComponent', () => {
  let component: ReviewInputComponent;
  let fixture: ComponentFixture<ReviewInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewInputComponent,
        DifficultyPipe,
        RatingPipe,
       ],
       imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        HttpClientTestingModule,
        FormsModule,
        MatFormFieldModule,
        MatSliderModule,
        MatSnackBarModule,
        MatChipsModule,
        MatIconModule
       ],
      providers: [DecimalPipe,GameService,UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
