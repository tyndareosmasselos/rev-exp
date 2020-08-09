import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[error]'
})
export class ErrorDirective {

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = "#e81c1c";
  }

}
