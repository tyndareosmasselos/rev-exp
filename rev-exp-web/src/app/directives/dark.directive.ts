import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[dark]'
})
export class DarkDirective {

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = "#000070";
  }

}
