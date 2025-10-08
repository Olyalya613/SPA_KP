import { TestBed } from '@angular/core/testing';
import { PhonesService } from './phones.service';
import { Phone } from '../models/phone';

class FakeSupabase {
  from() { return this; }
  select() { return Promise.resolve({ data: [], error: null }); }
  insert(_: any) { return Promise.resolve({ error: null }); }
  update(_: any) { return Promise.resolve({ error: null }); }
  delete() { return Promise.resolve({ error: null }); }
  eq(_: string, __: any) { return this; }
}

describe('PhonesService', () => {
  let svc: PhonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhonesService,
        { provide: 'SUPABASE', useValue: new FakeSupabase() }
      ]
    });
    svc = TestBed.inject(PhonesService);
  });

  it('should create', () => {
    expect(svc).toBeTruthy();
  });

  it('create() should resolve', async () => {
    await expectAsync(svc.create({ brand:'A', model:'B', os:'C', released:2024, price:1 } as Phone)).toBeResolved();
  });
});
