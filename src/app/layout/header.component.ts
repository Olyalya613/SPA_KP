import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
<header class="app-header">
  <a class="brand" routerLink="/">PhonesArchive</a>
  <nav class="tabs">
    <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Каталог</a>
    <a routerLink="/create" routerLinkActive="active">Додати</a>
    <a routerLink="/profile" routerLinkActive="active" *ngIf="auth.isAuthenticated()">Профіль</a>
  </nav>
  <div class="auth">
    <ng-container *ngIf="!auth.isAuthenticated(); else logged">
      <a class="btn ghost" routerLink="/login">Вхід</a>
      <a class="btn primary" routerLink="/register">Реєстрація</a>
    </ng-container>
    <ng-template #logged>
      <button class="btn ghost" (click)="auth.logout()">Вийти</button>
    </ng-template>
  </div>
</header>
`,
  styles: [`
  .app-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;position:sticky;top:0;background:#0f0f14;border-bottom:1px solid rgba(255,77,184,.2);z-index:10}
  .brand{font-weight:700;color:#fff;text-decoration:none}
  .tabs a{margin:0 6px;padding:.4rem .7rem;border-radius:.5rem;text-decoration:none;color:#e6e6e6}
  .tabs a.active{background:rgba(255,77,184,.2);color:#fff}
  .btn{padding:.45rem .9rem;border-radius:.75rem;cursor:pointer;margin-left:.5rem}
  .btn.primary{background:#ff4db8;color:#fff}
  .btn.ghost{border:1px solid #ff4db8;color:#ff4db8;background:transparent}
  `]
})
export class HeaderComponent{
  constructor(public auth: AuthService) {}
}
