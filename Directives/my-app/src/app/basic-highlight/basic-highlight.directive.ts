import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector : '[appBasicHighlight]'
})
export class HighLightDirective implements OnInit {
  constructor(private eleRef: ElementRef) {
  }

  ngOnInit() {
    this.eleRef.nativeElement.style.backgroundColor = 'green';
  }
}
