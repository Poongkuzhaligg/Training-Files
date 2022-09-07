import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

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


  @HostListener('wheel', ["$event"] )
    onScroll(event: WheelEvent) {
      var x = this.ImageRef.nativeElement.clientWidth;
      var y = this.ImageRef.nativeElement.clientHeight;


      if(event.deltaY<0){
        this.ImageRef.nativeElement.style.width = (x+10)+'px';
        this.ImageRef.nativeElement.style.height = (y+10)+'px';
      }
      else if(event.deltaY>0){

        this.ImageRef.nativeElement.style.width = (x-10)+'px';
        this.ImageRef.nativeElement.style.height = (y-10)+'px';
      }
      console.log(event.deltaX, event.deltaY);
      console.log(x,y);
    }
}
