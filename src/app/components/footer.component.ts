import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="wrap container">
        <div class="small">© {{year}} PhonesArchive</div>
        <div class="small">Учбовий проєкт - Angular + Supabase</div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  year = new Date().getFullYear();
}