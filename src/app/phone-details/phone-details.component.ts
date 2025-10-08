import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, switchMap, filter } from 'rxjs';
import { PhonesService } from '../services/phones.service';
import { Phone } from '../models/phone';

@Component({
  standalone: true,
  selector: 'app-phone-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.css'],
})
export class PhoneDetailsComponent {
  private route = inject(ActivatedRoute);
  private api = inject(PhonesService);

  phone$!: Observable<Phone>;

  ngOnInit() {
    this.phone$ = this.route.paramMap.pipe(
      map(pm => Number(pm.get('id'))),
      filter((id): id is number => Number.isFinite(id)),
      switchMap(id => this.api.getById(id) as unknown as Observable<Phone>),
    );
  }

  placeholder(img?: string) {
    return img && img.trim()
      ? img
      : 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="100%" height="100%" fill="#111"/><text x="50%" y="50%" fill="#f472b6" font-family="Inter,Arial" font-size="40" text-anchor="middle">No image</text></svg>`);
  }
}