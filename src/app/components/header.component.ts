import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <nav class="nav container">
        <a class="brand" routerLink="/">
          <span class="dot"></span><span>PhonesArchive</span>
        </a>
        <div class="menu">
          <a class="link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact:true }">Каталог</a>
          <a class="link" routerLink="/create" routerLinkActive="active">Додати</a>
          <a class="link" routerLink="/profile" routerLinkActive="active">Профіль</a>
          <a class="btn btn-outline" routerLink="/login">Вхід</a>
          <a class="btn btn-primary" routerLink="/register">Реєстрація</a>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {}