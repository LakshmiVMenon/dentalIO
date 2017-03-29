import { Directive, ElementRef, Renderer} from '@angular/core';

@Directive({selector:'[leftknob]'})
export class LeftKnobDirective{
    constructor(private renderer:Renderer,private el:ElementRef){}

    setLeftPos(leftPos){
        this.renderer.setElementStyle(this.el.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.el.nativeElement, 'left', leftPos+'px');
    }

    getLeftPos(){
        return this.el.nativeElement.offsetLeft
    }
}