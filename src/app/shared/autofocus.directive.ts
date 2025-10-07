import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {
  /** Optional delay in ms */
  @Input('appAutofocus') delay = 0;
  constructor(private el: ElementRef<HTMLElement>) {}
  ngAfterViewInit() {
    const ms = Number(this.delay) || 0;
    setTimeout(() => this.el.nativeElement?.focus?.(), ms);
  }
}
