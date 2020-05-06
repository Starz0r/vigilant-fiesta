import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaNoticeComponent } from './captcha-notice.component';

describe('CaptchaNoticeComponent', () => {
  let component: CaptchaNoticeComponent;
  let fixture: ComponentFixture<CaptchaNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
