import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';

class MockAuthService { token = 'TEST_TOKEN'; }

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let ctrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: (window as any).AuthService ?? 'AuthService', useClass: MockAuthService }
      ]
    });
    http = TestBed.inject(HttpClient);
    ctrl = TestBed.inject(HttpTestingController);
  });

  it('adds Authorization header when token exists', () => {
    http.get('/api/test').subscribe();
    const req = ctrl.expectOne('/api/test');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    ctrl.verify();
  });
});
