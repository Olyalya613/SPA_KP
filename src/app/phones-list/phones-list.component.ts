import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PhonesService } from '../services/phones.service';
import { Phone } from '../models/phone';

@Component({
  standalone: true,
  selector: 'app-phones-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './phones-list.component.html',
  styleUrls: ['./phones-list.component.css'],
})
export class PhonesListComponent {
  private api = inject(PhonesService);
  phones$!: Observable<Phone[]>;
  placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="100%" height="100%" fill="#111"/><text x="50%" y="50%" fill="#f472b6" font-family="Inter,Arial" font-size="40" text-anchor="middle">No image</text></svg>`);

  ngOnInit() {
    const svc: any = this.api as any;
    this.phones$ = (svc.list?.() ?? svc.getAll?.() ?? svc.all$) as Observable<Phone[]>;
  }
}