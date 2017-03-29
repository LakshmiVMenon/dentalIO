import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({selector:'[rangeDirective]'})
export class SliderRangeDirective{
    constructor(private el:ElementRef, private renderer:Renderer){}

    setWidth(width){
        this.renderer.setElementStyle(this.el.nativeElement, 'width', width+'px');
    }
}