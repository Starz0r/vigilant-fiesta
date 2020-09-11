import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TokenInterceptor } from './token-interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { UserService } from './service/user.service';
import { BehaviorSubject } from 'rxjs';

describe(`TokenInterceptor`, () => {
  let httpMock: HttpTestingController;

  let token = "";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
        {
          provide: UserService,
          useValue: {
            updateToken(newToken: string) {
              token = newToken;
            },
            userChange: new BehaviorSubject(null)
          }
        }
      ],
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should update the token if the server sends one', inject([HttpClient],
    async (http: HttpClient) => {
      http.get('/e').subscribe(r => { })
      const httpRequest = httpMock.expectOne(`/e`);
      httpRequest.flush({},{headers: {token:'xxx'}})
      expect(token).toEqual('xxx');
  }));
});