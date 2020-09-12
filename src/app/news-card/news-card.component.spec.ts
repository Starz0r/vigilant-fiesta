import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardComponent } from './news-card.component';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCardComponent ],
      imports: [
        MatCardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show bbcode', () => {
    component.news = {short:"[b]test[/b]"};
    fixture.detectChanges();
    const boldText = el.query(By.css('mat-card mat-card-content b')).nativeElement;
    expect(boldText.innerHTML).toContain('test');
  });
});
