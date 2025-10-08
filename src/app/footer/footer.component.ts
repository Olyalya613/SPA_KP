import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `<footer class="site-footer" role="contentinfo">© {{year}} Phones Archive</footer>`
})
export class FooterComponent { year = new Date().getFullYear(); }
