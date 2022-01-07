import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Directive({
  selector: '[appCustomButton]'
})
export class CustomButtonDirective {

  constructor(private el:ElementRef, private route:Router) { }

  @HostListener('click')
   onClick()
  {

if(this.el.nativeElement.className == "Icon")
{
this.el.nativeElement.classList.add('open')
}
else {
  this.el.nativeElement.classList.remove('open')
this.route.navigateByUrl("main");
}
  }


}
