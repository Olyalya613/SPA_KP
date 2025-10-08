import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { PhonesService } from '../services/phones.service';
import { Phone } from '../models/phone';

@Component({
  selector: 'app-phone-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.css']
})
export class PhoneFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(PhonesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editId: number | null = null;

  form = this.fb.group({
    id: [0],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    os: ['', Validators.required],
    released: [2024, Validators.required],
    price: [0, Validators.required],
    imageUrl: [''],
    description: ['']
  });

  ngOnInit(): void {
    const raw = this.route.snapshot.paramMap.get('id');
    this.editId = raw !== null ? Number(raw) : null;

    if (this.editId !== null && !Number.isNaN(this.editId)) {
      (this.api as any).getById(this.editId).subscribe((p: Phone) => this.form.patchValue(p));
    }
  }

  async save(): Promise<void> {
    const value = this.form.getRawValue() as Phone;
    if (this.editId !== null && !Number.isNaN(this.editId)) {
      await (this.api as any).update(this.editId, value);
    } else {
      await (this.api as any).create(value);
    }
    this.router.navigateByUrl('/');
  }
}
