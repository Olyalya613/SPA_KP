
import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseHeaders: Record<string, string> = { 'X-App': 'Phones-Archive' };
    const token = this.auth.token;
    const cloned = token
      ? req.clone({ setHeaders: { ...baseHeaders, Authorization: `Bearer ${token}` } })
      : req.clone({ setHeaders: baseHeaders });
    return next.handle(cloned);
  }
}
