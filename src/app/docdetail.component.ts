import { Component, OnInit } from '@angular/core';
// import { BrowserDomAdapter } from 'angular/platform-browser';

import { DocDetailService } from './docdetail.service';
import { Doctor } from './doctor';

@Component({
    moduleId:module.id,
    templateUrl:'./docdetail.component.html',
    styleUrls:['./docdetail.component.css']
})

export class DocDetailComponent implements OnInit{
    constructor(private docDetailService:DocDetailService){}
    doctors: Doctor[] = [];
    searchText: string = '';
    resultCountText:string='';
    sortClass :string = 'sortwrapperDiv';
    filterClass : string = 'filterwrapper';
    searchClass : string = 'searchwrapperdiv';
    headerClass : string = 'headerNavList';

    
    ngOnInit(){
        this.addListeners();
        this.getDoctors();
    }

    ngAfterViewInit(){
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
        var knobdiv = document.getElementById('knob1');
        var knobWidth = document.getElementById('knobimg1').offsetWidth;
        var trackWidth = document.getElementById('slidertrackdiv').offsetWidth;
        let minPos = document.getElementById('slidertrackdiv').offsetLeft - knobWidth/2;
        let maxPos = document.getElementById('knob2').offsetLeft;
        knobdiv.style.position = 'absolute';
        knobdiv.style.left = this.calculatePosition(minPos,maxPos, e.clientX ) + 'px';
        this.populateTimeValue("leftval",this.calculateTime(trackWidth,knobdiv.offsetLeft,minPos))
        this.calculateRangeWidth();
    }

    moveknob2(e){
        var knobdiv = document.getElementById('knob2');
        var knobWidth = document.getElementById('knobimg1').offsetWidth;
        var trackWidth = document.getElementById('slidertrackdiv').offsetWidth;
        var trackLeft = document.getElementById('slidertrackdiv').offsetLeft;
        var minPos = document.getElementById('knob1').offsetLeft;
        var maxPos = trackLeft + trackWidth - knobWidth/2;
        knobdiv.style.position = 'absolute';
        knobdiv.style.left = this.calculatePosition(minPos,maxPos, e.clientX ) + 'px';
        this.populateTimeValue("rightval",this.calculateTime(trackWidth,knobdiv.offsetLeft,trackLeft));
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
        var knobWidth = document.getElementById('knobimg1').offsetWidth;
        var blockNum = Math.floor((knobPos-trackPos+(knobWidth/2))/(trackWidth/12));
        var time = blockNum + 8;
        var formattedTime = this.formattime(time);
        return formattedTime;
    }

    populateTimeValue(spanId,time){
        var element = document.getElementById(spanId);
        element.innerHTML = time;
    }

    calculateRangeWidth(){
        var knob1Pos = document.getElementById('knob1').offsetLeft;
        var knob2Pos = document.getElementById('knob2').offsetLeft;
        var rangeWidth = knob2Pos - knob1Pos - 2;
        document.getElementById("slideRangeDiv").style.width = rangeWidth + 'px';
        
    }

    initialiseKnobPositions(){
        var trackWidth = document.getElementById('slidertrackdiv').offsetWidth;
        var trackLeft = document.getElementById('slidertrackdiv').offsetLeft;
        var knobWidth = document.getElementById('knobimg1').offsetWidth;
        var knob1div = document.getElementById('knob1');
        var knob2div = document.getElementById('knob2');
        
        var minPos = trackLeft - knobWidth/2;
        var maxPos = trackLeft + trackWidth - knobWidth/2;
        
        knob1div.style.position = 'absolute';
        knob1div.style.left = minPos+ 'px';
        this.populateTimeValue("leftval",this.calculateTime(trackWidth,minPos,trackLeft))
        
        knob2div.style.position = 'absolute';
        knob2div.style.left = maxPos + 'px';
        this.populateTimeValue("rightval",this.calculateTime(trackWidth,maxPos,trackLeft))
        
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
        var trackWidth = document.getElementById('slidertrackdiv').offsetWidth;
        var knob1val = document.getElementById('leftval').innerHTML;
        var knob1 = this.extractTime(knob1val)//knob1val.replace(/\D/g, '');
        var knob2val = document.getElementById('rightval').innerHTML;
        var knob2 = this.extractTime(knob2val)//knob1val.replace(/\D/g, '');
        
        var knob1pos = this.calculateknobPos(knob1,trackWidth);
        var knob2pos = this.calculateknobPos(knob2,trackWidth);
        var knob1div = document.getElementById('knob1');
        var knob2div = document.getElementById('knob2');
        knob1div.style.position = 'absolute';
        knob1div.style.left = knob1pos+ 'px';
        
        knob2div.style.position = 'absolute';
        knob2div.style.left = knob2pos + 'px';
        this.calculateRangeWidth();
    }

    calculateknobPos(knobValue,trackWidth){
        var knobWidth = document.getElementById('knobimg1').offsetWidth;
        var trackleft = document.getElementById('slidertrackdiv').offsetLeft;
        var pos = ((knobValue-8) * (trackWidth/12)) +trackleft - (knobWidth/2) ;
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