import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsWriterComponent } from './news-writer.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewsCardComponent } from '../news-card/news-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

describe('NewsWriterComponent', () => {
  let component: NewsWriterComponent;
  let fixture: ComponentFixture<NewsWriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsWriterComponent,
      NewsCardComponent ],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        BrowserAnimationsModule,
        BrowserModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
