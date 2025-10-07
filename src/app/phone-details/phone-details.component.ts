import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PhonesService } from '../services/phones.service';
import { Phone } from '../models/phone';

@Component({
  selector: 'app-phone-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './phone-details.component.html'
})
export class PhoneDetailsComponent {
  phone?: Phone;
  placeholder =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 120'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23ff3e86'/><stop offset='1' stop-color='%2312121a'/></linearGradient></defs><rect width='160' height='120' fill='url(%23g)'/><g fill='white' opacity='0.9'><rect x='48' y='28' width='64' height='48' rx='6'/><rect x='62' y='84' width='36' height='6' rx='3'/></g></svg>";

  constructor(private route: ActivatedRoute, private api: PhonesService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getById(id).subscribe((p: Phone) => this.phone = p);
  }

  imgError(ev: Event) {
    (ev.target as HTMLImageElement).src = this.placeholder;
  }
}
