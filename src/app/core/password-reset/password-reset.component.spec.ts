import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetComponent } from './password-reset.component';
import { UserService } from '../../service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CaptchaNoticeComponent } from '../../captcha-notice/captcha-notice.component';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { mockCaptchaService } from '../../service/user.service.spec';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetComponent,
        CaptchaNoticeComponent ],
      imports: [
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [ UserService,
        {provide: ReCaptchaV3Service, useClass: mockCaptchaService} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
