import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[primary]'
})
export class PrimaryDirective {

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = "#4527a0";
  }

}
