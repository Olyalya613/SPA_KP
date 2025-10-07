import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{constructor(private auth:AuthService){}
intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{const headers:any={'X-App':'Phones-Archive'};const t=this.auth.token;if(t) headers['Authorization']=`Bearer ${t}`;return next.handle(req.clone({setHeaders:headers}))}}
