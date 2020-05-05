import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSpoilerComponent } from './comment-spoiler.component';

describe('CommentSpoilerComponent', () => {
  let component: CommentSpoilerComponent;
  let fixture: ComponentFixture<CommentSpoilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentSpoilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentSpoilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
