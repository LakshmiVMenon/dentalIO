import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {By} from "@angular/platform-browser";
import { Http, ConnectionBackend , HttpModule } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import { DocDetailComponent } from './docdetail.component';
import { DocDetailService } from './docdetail.service';
import { Doctor } from './doctor';

describe('DocDetailComponent', () =>{
    let service;
    let spy;
    let comp:    DocDetailComponent;
    let fixture: ComponentFixture<DocDetailComponent>;
    let de:      DebugElement;

    var DOCTORS = () => [
        { "_id" : "58b69129c53e0351981dc3a9", "name" : "Dr. Michael Faradai", "role" : "Dental Implant Surgeon", "qualification" : "BDS, DDS, DMD, MS", "experience" : "45", "clinics" : [ { "name" : "Parkway Dental Care", "address" : "5250 Taylor Street, San Diego", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 1800 }, { "name" : "Matilda DentalCare Centre", "address" : "3290 Nunc. Avenue, Washington DC", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 1600 } ], "profileimg" : "profile_pic4" },
        { "_id" : "58b6929ec53e0351981dc3aa", "name" : "Dr. Caroline Barton", "role" : "Dental Assistant", "qualification" : "BDS, DDS, FICOI", "experience" : "29", "clinics" : [ { "name" : "Aspenwood Dental Associates", "address" : "2900 S. Peoria Street, Aurora, CO 80014", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 900 }, { "name" : "Smile Brands Dental Inc", "address" : "201 E. Sandpointe, Santa Ana, CA 92707", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 450 } ], "profileimg" : "profile_pic3" },
        { "_id" : "58b6929ec53e0351981dc3ab", "name" : "Dr. Melissa Franklin", "role" : "Restorative Dentistry", "qualification" : "BDS, DDS, FICOI", "experience" : "30", "clinics" : [ { "name" : "Colorado Dental Implant Center", "address" : "100 Florida Avenue, New Orleans, LA 70119", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 800 }, { "name" : "Astoria Dental Group", "address" : "3633 Omega Road, Dallas, TX 75244", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 600 } ], "profileimg" : "profile_pic2" },
        { "_id" : "58b6929ec53e0351981dc3ac", "name" : "Dr. Richard Phillips", "role" : "Cheif Consultant", "qualification" : "BDS, DDS", "experience" : "18", "clinics" : [ { "name" : "Sherman Oaks Dentistry", "address" : "4955 Van Nuys Blvd, Sherman Oaks, CA 91403", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 200 }, { "name" : "Roberts & De Marsche", "address" : "399 East 72nd Street, New York, NY 10021", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 200 } ], "profileimg" : "profile_pic1" }
    ] as Doctor[];
    let doctors = DOCTORS();

    beforeEach(async(() =>{
        TestBed.configureTestingModule({
            providers:[DocDetailService,
                     Http, ConnectionBackend],
            imports:[FormsModule, RouterTestingModule, HttpModule],
            declarations:[DocDetailComponent]
        }).compileComponents();
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DocDetailComponent);
        comp = fixture.debugElement.componentInstance;
        service = fixture.debugElement.injector.get(DocDetailService);
        let doctors = DOCTORS();

        spy = spyOn(service, 'getDoctors')
                .and.returnValue(Observable.of(doctors));
    });

    it('DocDetailComponent should be truthy', async(() => {
        expect(comp).toBeTruthy();
    }));

    it('should not show doctors list before OnInit', () => {
        expect(comp.doctors.length).toBe(0, 'Doctor list not displayed');
        expect(spy.calls.any()).toBe(false, 'getDoctors not yet called');
    });
    
    it('should show quote after doctors list promise (async)', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => { // wait for async getDoctors call to return
        fixture.detectChanges();        // update view with doctors
        expect(comp.doctors.length).toBe(4);
        });
    }));


})