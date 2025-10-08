import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
<section class="auth-card">
  <h2>Реєстрація</h2>
  <form [formGroup]="form" (ngSubmit)="submit()">
    <label>Email<input type="email" formControlName="email" autofocus /></label>
    <label>Пароль<input type="password" formControlName="password" /></label>
    <div class="row">
      <button class="btn primary" type="submit" [disabled]="form.invalid || loading">Зареєструватися</button>
      <a class="btn ghost" routerLink="/login">Вхід</a>
    </div>
  </form>
</section>
`,
  styles: [`
  .auth-card{max-width:420px;margin:32px auto;padding:24px;border:1px solid rgba(255,77,184,.2);border-radius:16px;background:rgba(255,255,255,.02)}
  form{display:flex;flex-direction:column;gap:12px}
  label{display:flex;flex-direction:column;color:#ddd;font-size:.95rem}
  input{margin-top:6px;padding:.6rem .8rem;border-radius:.6rem;border:1px solid #333;background:#0f0f14;color:#fff}
  .row{display:flex;gap:8px;align-items:center}
  .btn{padding:.55rem 1rem;border-radius:.75rem}
  .btn.primary{background:#ff4db8;color:#fff}
  .btn.ghost{border:1px solid #ff4db8;color:#ff4db8;background:transparent}
  `]
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}
  ngOnInit(): void {
    this.form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });
  }
  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const { email, password } = this.form.getRawValue();
    this.auth.register(email!, password!).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (e) => { alert(e?.message ?? 'Помилка реєстрації'); this.loading = false; }
    });
  }
}
