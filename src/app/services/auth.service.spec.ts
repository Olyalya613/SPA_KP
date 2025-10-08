import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

class FakeSupabase {
  auth = {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: (_cb: any) => ({ data: { subscription: { unsubscribe(){} } } }),
    signInWithPassword: (_: any) => Promise.resolve({ data: { session: { user: { id: '1', email: 'a@b.c' } } }, error: null }),
    signUp: (_: any) => Promise.resolve({ data: { user: { id: '1', email: 'a@b.c' } }, error: null }),
    signOut: () => Promise.resolve({ error: null })
  };
}

describe('AuthService', () => {
  let svc: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: 'SUPABASE', useValue: new FakeSupabase() }
      ]
    });
    svc = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(svc).toBeTruthy();
  });
});
