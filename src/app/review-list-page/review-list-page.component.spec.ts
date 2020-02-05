import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListPageComponent } from './review-list-page.component';

describe('ReviewListPageComponent', () => {
  let component: ReviewListPageComponent;
  let fixture: ComponentFixture<ReviewListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewListPageComponent ]
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
