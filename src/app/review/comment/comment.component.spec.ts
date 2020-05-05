import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { CommentSpoilerComponent } from '../comment-spoiler/comment-spoiler.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentComponent,
        CommentSpoilerComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display reviews without any spoilers as one element', () => {
    component.comment = "normal comment"
    let result = component.getComments()
    expect(result).toBeTruthy();
    expect(result.length).toEqual(1);
    expect(result[0].content.trim()).toEqual("normal comment");
  });

  it('should display reviews with one spoiler in the middle', () => {
    component.comment = "normal [spoiler]spoiler[/spoiler] comment"
    let result = component.getComments();
    expect(result).toBeTruthy();
    expect(result.length).toEqual(3);
    expect(result[0].content.trim()).toEqual("normal");
    expect(result[1].content.trim()).toEqual("spoiler");
    expect(result[2].content.trim()).toEqual("comment");
  });

  it('should display reviews with one spoiler at the end', () => {
    component.comment = "normal comment [spoiler]spoiler[/spoiler]"
    let result = component.getComments();
    expect(result).toBeTruthy();
    expect(result.length).toEqual(2);
    expect(result[0].content.trim()).toEqual("normal comment");
    expect(result[1].content.trim()).toEqual("spoiler");
  });

  it('should display reviews with one spoiler at the beginning', () => {
    component.comment = "[spoiler]spoiler[/spoiler] normal comment"
    let result = component.getComments();
    expect(result).toBeTruthy();
    expect(result.length).toEqual(2);
    expect(result[0].content.trim()).toEqual("spoiler");
    expect(result[1].content.trim()).toEqual("normal comment");
  });

  it('should display reviews with back-to-back spoilers', () => {
    component.comment = "normal [spoiler]spoiler1[/spoiler][spoiler]spoiler2[/spoiler] comment"
    let result = component.getComments();
    expect(result).toBeTruthy();
    expect(result.length).toEqual(4);
    expect(result[0].content.trim()).toEqual("normal");
    expect(result[1].content.trim()).toEqual("spoiler1");
    expect(result[2].content.trim()).toEqual("spoiler2");
    expect(result[3].content.trim()).toEqual("comment");
  });
});
