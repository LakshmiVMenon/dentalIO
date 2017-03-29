import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[sliderTrack]'
})
export class SliderTrackDirective{
    constructor(private el:ElementRef,private renderer: Renderer){
    }

    getTrackWidth(){
        return this.el.nativeElement.offsetWidth;
    }
    
    getLeft(){
        return this.el.nativeElement.offsetLeft;
    }
}