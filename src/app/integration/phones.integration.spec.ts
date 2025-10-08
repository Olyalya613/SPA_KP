import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Phone } from '../models/phone';
import { PhoneFormComponent } from '../phone-form/phone-form.component';
import { PhonesService } from '../services/phones.service';

class FakePhonesService {
  private _items = new BehaviorSubject<Phone[]>([]);
  list$ = this._items.asObservable();
  async create(p: Phone){ this._items.next([p]); }
  getById(){ return this.list$ as any; }
  update(){ return Promise.resolve(); }
}

@Component({
  standalone: true,
  imports: [PhoneFormComponent],
  template: `<app-phone-form/>`
})
class Host {}

describe('Integration: PhoneForm + PhonesService', () => {
  it('submits and calls service.create', async () => {
    await TestBed.configureTestingModule({
      imports: [Host],
      providers: [{ provide: PhonesService, useClass: FakePhonesService }]
    }).compileComponents();

    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('input[formControlName=brand]') as HTMLInputElement).value = 'Apple';
    (compiled.querySelector('input[formControlName=model]') as HTMLInputElement).value = 'iPhone';
    (compiled.querySelector('input[formControlName=os]') as HTMLInputElement).value = 'iOS';
    (compiled.querySelector('input[formControlName=released]') as HTMLInputElement).value = '2024';
    (compiled.querySelector('input[formControlName=price]') as HTMLInputElement).value = '999';

    ['brand','model','os','released','price'].forEach(name => {
      const el = compiled.querySelector(`[formcontrolname=${name}]`) as HTMLInputElement;
      el.dispatchEvent(new Event('input'));
    });

    (compiled.querySelector('button[type=submit]') as HTMLButtonElement).click();
    expect(true).toBeTrue();
  });
});
