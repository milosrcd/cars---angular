import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCarBackground]'
})
export class CarBackgroundDirective implements OnInit {
  @Input() price!: number;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.setElementBackground();
  }

  private setElementBackground() {
    if (this.price < 5000) {
      this.elementRef.nativeElement.style.backgroundColor = '#cfffca';
    } else if (this.price >= 5000 && this.price <= 15000) {
      this.elementRef.nativeElement.style.backgroundColor = '#dcffff';
    } else {
      this.elementRef.nativeElement.style.backgroundColor = 'white';
    }
  }
}
