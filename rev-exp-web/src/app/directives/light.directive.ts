import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[light]'
})
export class LightDirective {
  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = "#7953d2";
  }

}
