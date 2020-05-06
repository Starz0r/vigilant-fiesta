import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';

export class mockCaptchaService {
  execute(token: string): Observable<string> {
    return of("test-token");
  }
}

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {provide: ReCaptchaV3Service, useClass: mockCaptchaService}
      ],
      imports:[
        HttpClientTestingModule,
        MatSnackBarModule
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
