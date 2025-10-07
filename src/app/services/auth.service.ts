import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
@Injectable({providedIn:'root'})
export class AuthService{private _token=signal<string|null>(localStorage.getItem('token'));token$=this._token.asReadonly();isAuthenticated(){return !!this._token()}
login(username:string,password:string):Observable<boolean>{if(username&&password){const tok=btoa(username+':'+password);localStorage.setItem('token',tok);this._token.set(tok);return of(true)}return throwError(()=>new Error('Bad credentials'))}
register(username:string,password:string){return this.login(username,password)}
logout(){localStorage.removeItem('token');this._token.set(null)}
get token(){return this._token()} }
