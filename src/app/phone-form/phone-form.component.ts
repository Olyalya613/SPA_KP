import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { PhonesService } from '../services/phones.service';
import { Phone } from '../models/phone';

@Component({
  selector: 'app-phone-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './phone-form.component.html'
})
export class PhoneFormComponent {
  editing = false;
  placeholder =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 120'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23ff3e86'/><stop offset='1' stop-color='%2312121a'/></linearGradient></defs><rect width='160' height='120' fill='url(%23g)'/><g fill='white' opacity='0.9'><rect x='48' y='28' width='64' height='48' rx='6'/><rect x='62' y='84' width='36' height='6' rx='3'/></g></svg>";

  form = this.fb.group({
    id: [0],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    os: ['Android', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    released: [2024, [Validators.required, Validators.min(1995)]],
    imageUrl: [''],
    description: ['']
  });

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private api: PhonesService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.api.getById(Number(id)).subscribe((p: Phone) => this.form.patchValue(p));
    }
  }

  save() {
    const value = this.form.getRawValue() as Phone;
    const obs = this.editing
      ? this.api.update(value.id, value)
      : this.api.create(value);
    obs.subscribe(() => this.router.navigateByUrl('/'));
  }

  imgError(ev: Event) {
    (ev.target as HTMLImageElement).src = this.placeholder;
  }
}
