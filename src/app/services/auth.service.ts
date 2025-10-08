
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map, of, throwError } from 'rxjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase?: SupabaseClient;

  private _token$ = new BehaviorSubject<string | null>(
    typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null
  );
  /** Stream for UI bindings */
  readonly token$ = this._token$.asObservable();

  constructor() {
    // Initialize Supabase if env is provided
    if ((environment as any)?.supabase?.url && (environment as any)?.supabase?.anonKey) {
      this.supabase = createClient(
        (environment as any).supabase.url,
        (environment as any).supabase.anonKey
      );

      // Pull current session on bootstrap
      this.supabase.auth.getSession().then(({ data }) => {
        const tok = data.session?.access_token ?? null;
        if (tok) localStorage.setItem('token', tok);
        this._token$.next(tok);
      });

      // Keep token in sync
      this.supabase.auth.onAuthStateChange((_evt, session) => {
        const tok = session?.access_token ?? null;
        if (tok) localStorage.setItem('token', tok);
        else localStorage.removeItem('token');
        this._token$.next(tok);
      });
    }
  }

  /** Snapshot token getter (used by interceptor) */
  get token(): string | null {
    return this._token$.getValue();
  }

  /** Simple boolean flag for guards/templates */
  isAuthenticated(): boolean {
    return !!this._token$.getValue();
  }

  login(email: string, password: string): Observable<void> {
    if (this.supabase) {
      return from(this.supabase.auth.signInWithPassword({ email, password })).pipe(
        map(({ error }) => {
          if (error) throw error;
        })
      );
    }
    // Fallback demo mode when Supabase isn't configured
    if (!email || !password) return throwError(() => new Error('Bad credentials'));
    const tok = btoa(`${email}:${password}`);
    localStorage.setItem('token', tok);
    this._token$.next(tok);
    return of(void 0);
  }

  register(email: string, password: string): Observable<void> {
    if (this.supabase) {
      return from(this.supabase.auth.signUp({ email, password })).pipe(
        map(({ error }) => {
          if (error) throw error;
        })
      );
    }
    // In demo mode treat registration as login
    return this.login(email, password);
  }

  logout(): void {
    if (this.supabase) {
      this.supabase.auth.signOut();
    }
    localStorage.removeItem('token');
    this._token$.next(null);
  }
}
