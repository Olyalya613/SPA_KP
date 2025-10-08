import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User { id:number; name:string; email:string; token:string; }
const STORAGE_KEY = 'pa_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSub = new BehaviorSubject<User | null>(read());
  user$ = this.userSub.asObservable();

  get user(){ return this.userSub.value; }
  get token(){ return this.userSub.value?.token ?? null; }
  get isAuthenticated(){ return !!this.token; }

  login(email:string, password:string):Observable<User>{
    const user: User = { id:1, name: email.split('@')[0] || 'User', email, token: 'DEMO_'+Math.random().toString(36).slice(2) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.userSub.next(user);
    return of(user);
  }

  register(name:string, email:string, password:string){ return this.login(email, password); }
  logout(){ localStorage.removeItem(STORAGE_KEY); this.userSub.next(null); }
}

function read():User|null{
  try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }catch{ return null; }
}
