import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AutofocusDirective } from '../shared/autofocus.directive';
import { PhonesService } from '../services/phones.service';
import { Phone } from '../models/phone';

@Component({
  selector: 'app-phones-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AutofocusDirective],
  templateUrl: './phones-list.component.html'
})
export class PhonesListComponent {
  query = '';
  phones: Phone[] = [];
  placeholder =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 120'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23ff3e86'/><stop offset='1' stop-color='%2312121a'/></linearGradient></defs><rect width='160' height='120' fill='url(%23g)'/><g fill='white' opacity='0.9'><rect x='48' y='28' width='64' height='48' rx='6'/><rect x='62' y='84' width='36' height='6' rx='3'/></g></svg>";

  constructor(private api: PhonesService) { this.load(); }

  load() { this.api.getAll().subscribe((list: Phone[]) => this.phones = list); }

  onSearch(v: string) { this.query = (v ?? '').trim().toLowerCase(); }

  filtered() {
    const q = this.query;
    if (!q) return this.phones;
    return this.phones.filter(p =>
      (p.brand + ' ' + p.model).toLowerCase().includes(q)
    );
  }

  imgError(ev: Event) {
    (ev.target as HTMLImageElement).src = this.placeholder;
  }
}
