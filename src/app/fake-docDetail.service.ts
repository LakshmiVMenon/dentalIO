import { Doctor } from './doctor';
import { DocDetailComponent } from './docdetail.component';
import { DocDetailService } from './docdetail.service';
import { Http, Response, Headers } from '@angular/http';

var DOCTORS = () => [
    { "_id" : "58b69129c53e0351981dc3a9", "name" : "Dr. Michael Faradai", "role" : "Dental Implant Surgeon", "qualification" : "BDS, DDS, DMD, MS", "experience" : "45", "clinics" : [ { "name" : "Parkway Dental Care", "address" : "5250 Taylor Street, San Diego", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 1800 }, { "name" : "Matilda DentalCare Centre", "address" : "3290 Nunc. Avenue, Washington DC", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 1600 } ], "profileimg" : "profile_pic4" },
    { "_id" : "58b6929ec53e0351981dc3aa", "name" : "Dr. Caroline Barton", "role" : "Dental Assistant", "qualification" : "BDS, DDS, FICOI", "experience" : "29", "clinics" : [ { "name" : "Aspenwood Dental Associates", "address" : "2900 S. Peoria Street, Aurora, CO 80014", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 900 }, { "name" : "Smile Brands Dental Inc", "address" : "201 E. Sandpointe, Santa Ana, CA 92707", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 450 } ], "profileimg" : "profile_pic3" },
    { "_id" : "58b6929ec53e0351981dc3ab", "name" : "Dr. Melissa Franklin", "role" : "Restorative Dentistry", "qualification" : "BDS, DDS, FICOI", "experience" : "30", "clinics" : [ { "name" : "Colorado Dental Implant Center", "address" : "100 Florida Avenue, New Orleans, LA 70119", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 800 }, { "name" : "Astoria Dental Group", "address" : "3633 Omega Road, Dallas, TX 75244", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 600 } ], "profileimg" : "profile_pic2" },
    { "_id" : "58b6929ec53e0351981dc3ac", "name" : "Dr. Richard Phillips", "role" : "Cheif Consultant", "qualification" : "BDS, DDS", "experience" : "18", "clinics" : [ { "name" : "Sherman Oaks Dentistry", "address" : "4955 Van Nuys Blvd, Sherman Oaks, CA 91403", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 200 }, { "name" : "Roberts & De Marsche", "address" : "399 East 72nd Street, New York, NY 10021", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 200 } ], "profileimg" : "profile_pic1" }
] as Doctor[];

var http:Http
var doctors = DOCTORS();


export class FakeDocDetailService {
    constructor(){} 
    lastPromise: Promise<any>;

    getDoctors() {
        console.log("---doctors----"+doctors)
        return this.lastPromise = Promise.resolve<Doctor[]>(doctors);;
    }
}

