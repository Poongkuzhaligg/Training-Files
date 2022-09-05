import { AfterViewInit, Directive, ElementRef, HostListener, OnInit } from "@angular/core";

@Directive({
  selector: '[appZoomimg]'
})
export class ZoomImageDirective implements OnInit {
  constructor(private ImageRef: ElementRef) {
  }

  ngOnInit() {
  //  var a = this.ImageRef.nativeElement.style.width;
  //   var b = this.ImageRef.nativeElement.style.height;
  }
  // ngAfterViewInit() {
  //   console.log(this.ImageRef.nativeElement.style.width);
  //   console.log(this.ImageRef.nativeElement.style.height);
  // }

  @HostListener('wheel', ["$event"] )
    onScroll(event: WheelEvent) {
      var x:number = 100;
      var y:number = 100;
      // x++;
      // y--;

      if(event.deltaY<0){
        this.ImageRef.nativeElement.style.width = event.deltaY+'px';
        this.ImageRef.nativeElement.style.height = event.deltaY+'px';
      }
      else if(event.deltaY>0){

        this.ImageRef.nativeElement.style.width = event.deltaY+'px';
        this.ImageRef.nativeElement.style.height = event.deltaY+'px';
      }
      console.log(event.deltaX, event.deltaY);
    }
}
