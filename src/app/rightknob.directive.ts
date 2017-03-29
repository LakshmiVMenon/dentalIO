import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({selector:'[rightknob]'})
export class RightKnobDirective{
    constructor(private el:ElementRef, private renderer:Renderer){}

    setLeftPos(leftPos){
        this.renderer.setElementStyle(this.el.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.el.nativeElement, 'left', leftPos+'px');
    }

    getLeftPos(){
        return this.el.nativeElement.offsetLeft;
    }
}