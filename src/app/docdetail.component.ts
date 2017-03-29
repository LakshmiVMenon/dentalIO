import { Component, OnInit ,ViewChild, ElementRef,Renderer} from '@angular/core';
// import { BrowserDomAdapter } from 'angular/platform-browser';

import { DocDetailService } from './docdetail.service';
import { Doctor } from './doctor';
import { SliderTrackDirective } from './sliderTrack.directive';
import { LeftKnobDirective } from './leftknob.directive';
import { RightKnobDirective } from './rightknob.directive';
import { SliderRangeDirective } from './sliderrange.directive';

@Component({
    moduleId:module.id,
    templateUrl:'./docdetail.component.html',
    styleUrls:['./docdetail.component.css']
})

export class DocDetailComponent implements OnInit{
    constructor(private docDetailService:DocDetailService,private renderer:Renderer){}
    @ViewChild(SliderTrackDirective) sliderTrack : SliderTrackDirective;
    @ViewChild(LeftKnobDirective) leftKnob : LeftKnobDirective;
    @ViewChild(RightKnobDirective) rightKnob : RightKnobDirective;
    @ViewChild(SliderRangeDirective) rangedirective : SliderRangeDirective;
    @ViewChild('knobimage') knobimgeEl : ElementRef

    knobWidth : number;
    doctors: Doctor[] = [];
    searchText: string = '';
    resultCountText:string='';
    leftknobValue = '';
    rightknobValue = '';
    sortClass :string = 'sortwrapperDiv';
    filterClass : string = 'filterwrapper';
    searchClass : string = 'searchwrapperdiv';
    headerClass : string = 'headerNavList';

    
    ngOnInit(){
        this.addListeners();
        this.getDoctors();
    }

    ngAfterViewInit(){
        this.knobWidth = this.knobimgeEl.nativeElement.offsetWidth;
        this.initialiseKnobPositions();
    }

    ngAfterViewChecked(){
        this.refreshKnobs();
    }

    getDoctors(){
        this.docDetailService.getDoctors()
            .subscribe((result) =>{ 
                this.doctors = result
                this.refreshResultCount();
            });    
    }
    
    searchDoctor(){
        this.docDetailService.searchDoctor(this.searchText)
            .subscribe((result) =>{ 
                this.doctors = result
                this.refreshResultCount();
            });    
    }

    refreshResultCount(){
        if(this.doctors.length == 1){
            this.resultCountText = '1 Result Found';
        }
        else{
            this.resultCountText = this.doctors.length + ' Results Found'
        }
    }

    addListeners(){
        document.getElementById('knob1').addEventListener('mousedown', this.mouseDown.bind(this), false);
        window.addEventListener('mouseup', this.mouseUp, false);

        document.getElementById('knob2').addEventListener('mousedown', this.knob2MouseDown.bind(this), false);
        window.addEventListener('mouseup', this.knob2MouseUp, false);

        window.addEventListener("resize", this.refreshKnobs.bind(this));

    }

    mouseUp(){
        window.removeEventListener('mousemove', this.moveknob1, true);
    }

    mouseDown(e){
        window.addEventListener('mousemove', this.moveknob1.bind(this), true);
    }

    knob2MouseUp(){
        window.removeEventListener('mousemove', this.moveknob2, true);
    }

    knob2MouseDown(e){
        window.addEventListener('mousemove', this.moveknob2.bind(this), true);
    }

    moveknob1(e){
        var trackWidth = this.sliderTrack.getTrackWidth();                           
        let minPos = this.sliderTrack.getLeft() - this.knobWidth/2;
        let maxPos = this.rightKnob.getLeftPos();

        this.leftKnob.setLeftPos(this.calculatePosition(minPos,maxPos, e.clientX ));
        this.leftknobValue = this.calculateTime(trackWidth, this.leftKnob.getLeftPos(), minPos);
        this.calculateRangeWidth();
    }

    moveknob2(e){
        var trackWidth = this.sliderTrack.getTrackWidth();  
        var trackLeft = this.sliderTrack.getLeft();
        var minPos = this.leftKnob.getLeftPos();

        var maxPos = trackLeft + trackWidth - this.knobWidth/2;
        this.rightKnob.setLeftPos(this.calculatePosition(minPos,maxPos, e.clientX ));
        this.rightknobValue = this.calculateTime(trackWidth, this.rightKnob.getLeftPos() ,trackLeft);
        this.calculateRangeWidth();
    }

    calculatePosition(minPos,maxPos,mousePos) {
        var divPos = mousePos;
        if(mousePos <= minPos){
            divPos = minPos;
        }
        else if(mousePos >= maxPos){
            divPos = maxPos;
        }
        return divPos;
    }

    calculateTime(trackWidth,knobPos,trackPos){
        var blockNum = Math.floor((knobPos-trackPos+(this.knobWidth/2))/(trackWidth/12));
        var time = blockNum + 8;
        var formattedTime = this.formattime(time);
        return formattedTime;
    }

    populateTimeValue(spanId,time){
        var element = document.getElementById(spanId);
        element.innerHTML = time;
    }

    calculateRangeWidth(){
        var knob1Pos = this.leftKnob.getLeftPos();
        var knob2Pos = this.rightKnob.getLeftPos();
        var rangeWidth = knob2Pos - knob1Pos - 2;
        
        this.rangedirective.setWidth(rangeWidth)
        
    }

    initialiseKnobPositions(){
        var trackWidth = this.sliderTrack.getTrackWidth();
        var trackLeft = this.sliderTrack.getLeft();
        
        var minPos = trackLeft - this.knobWidth/2;
        var maxPos = trackLeft + trackWidth - this.knobWidth/2;
        
        this.leftKnob.setLeftPos(minPos);
        this.leftknobValue = this.calculateTime(trackWidth,minPos,trackLeft);
        
        this.rightKnob.setLeftPos(maxPos);
        this.rightknobValue = this.calculateTime(trackWidth,maxPos,trackLeft)
        
        this.calculateRangeWidth();
    }

    formattime(time) {
        var appender="AM";
        var formattedtime;
        if(time > 12){
            appender="PM";
            time = time-12;
        }
        if(time == 12){
            appender="PM";
        }
        formattedtime = time.toString() + " "+appender;
        return formattedtime;
    }

    refreshKnobs(){
        var trackWidth = this.sliderTrack.getTrackWidth();
        var knob1 = this.extractTime(this.leftknobValue)
        var knob2 = this.extractTime(this.rightknobValue)

        var knob1pos = this.calculateknobPos(knob1,trackWidth);
        var knob2pos = this.calculateknobPos(knob2,trackWidth);
        this.leftKnob.setLeftPos(knob1pos);
        
        this.rightKnob.setLeftPos(knob2pos);
    
        this.calculateRangeWidth();
    }

    calculateknobPos(knobValue,trackWidth){
        var trackleft = this.sliderTrack.getLeft();

        var pos = ((knobValue-8) * (trackWidth/12)) +trackleft - (this.knobWidth/2) ;
        return pos;
    }

    extractTime(timeStr){
        var textStr = timeStr.split(' ');
        var time = parseInt(timeStr.replace(/\D/g, ''));
        if(textStr[1] == "PM"){
            if( time !== 12){
                time = time + 12;
            }
        }
        return time;
    }


    expandFilters(){
        if(this.filterClass === "filterwrapper"){
            this.filterClass = "filterwrapper expand";
        }
        else{
            this.filterClass = "filterwrapper";
        }
    }

    expandSort(){
        if(this.sortClass === "sortwrapperDiv"){
            this.sortClass = "sortwrapperDiv expand";
        }
        else {
            this.sortClass = "sortwrapperDiv";
        }
    }

    expandSearch(){
        if(this.searchClass === "searchwrapperdiv"){
            this.searchClass = "searchwrapperdiv expand";
        }
        else {
            this.searchClass = "searchwrapperdiv";
        }
    }

    headerMenu() {
        if(this.headerClass === "headerNavList"){
            this.headerClass = "headerNavList responsive";
        }
        else {
            this.headerClass = "headerNavList";
        }
    }
}