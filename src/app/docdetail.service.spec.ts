import { Http, XHRBackend, Response, ResponseOptions, Headers, HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { Doctor } from './doctor';
import { DocDetailService } from './docdetail.service';


const DOCTORS = () => [
    { "_id" : "58b69129c53e0351981dc3a9", "name" : "Dr. Michael Faradai", "role" : "Dental Implant Surgeon", "qualification" : "BDS, DDS, DMD, MS", "experience" : "45", "clinics" : [ { "name" : "Parkway Dental Care", "address" : "5250 Taylor Street, San Diego", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 1800 }, { "name" : "Matilda DentalCare Centre", "address" : "3290 Nunc. Avenue, Washington DC", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 1600 } ], "profileimg" : "profile_pic4" },
    { "_id" : "58b6929ec53e0351981dc3aa", "name" : "Dr. Caroline Barton", "role" : "Dental Assistant", "qualification" : "BDS, DDS, FICOI", "experience" : "29", "clinics" : [ { "name" : "Aspenwood Dental Associates", "address" : "2900 S. Peoria Street, Aurora, CO 80014", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 900 }, { "name" : "Smile Brands Dental Inc", "address" : "201 E. Sandpointe, Santa Ana, CA 92707", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 450 } ], "profileimg" : "profile_pic3" },
    { "_id" : "58b6929ec53e0351981dc3ab", "name" : "Dr. Melissa Franklin", "role" : "Restorative Dentistry", "qualification" : "BDS, DDS, FICOI", "experience" : "30", "clinics" : [ { "name" : "Colorado Dental Implant Center", "address" : "100 Florida Avenue, New Orleans, LA 70119", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 800 }, { "name" : "Astoria Dental Group", "address" : "3633 Omega Road, Dallas, TX 75244", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 600 } ], "profileimg" : "profile_pic2" },
    { "_id" : "58b6929ec53e0351981dc3ac", "name" : "Dr. Richard Phillips", "role" : "Cheif Consultant", "qualification" : "BDS, DDS", "experience" : "18", "clinics" : [ { "name" : "Sherman Oaks Dentistry", "address" : "4955 Van Nuys Blvd, Sherman Oaks, CA 91403", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 200 }, { "name" : "Roberts & De Marsche", "address" : "399 East 72nd Street, New York, NY 10021", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 200 } ], "profileimg" : "profile_pic1" },
    { "_id" : "58b692a0c53e0351981dc3ad", "name" : "Dr. Johannes Kepler", "role" : "Cheif Consultant", "qualification" : "BDS, DDS", "experience" : "18", "clinics" : [ { "name" : "Sherman Oaks Dentistry", "address" : "4955 Van Nuys Blvd, Sherman Oaks, CA 91403", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 200 }, { "name" : "Roberts & De Marsche", "address" : "399 East 72nd Street, New York, NY 10021", "weekdaytiming" : "09:00 AM - 08:00 PM", "weekendtiming" : "09:00 AM - 08:00 PM", "fee" : 200 } ], "profileimg" : "profile_pic" }
] as Doctor[];

describe('DocDetailService ())', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        DocDetailService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
    .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([DocDetailService], (service: DocDetailService) => {
      expect(service instanceof DocDetailService).toBe(true);
  }));

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new DocDetailService(http);
    expect(service instanceof DocDetailService).toBe(true, 'new service should be ok');
  }));


  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
  }));

  describe('when getHeroes', () => {
      let backend: MockBackend;
      let service: DocDetailService;
      let docDump: Doctor[];
      let response: Response;

      beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new DocDetailService(http);
        docDump = DOCTORS();
        let options = new ResponseOptions( {status: 200, body : docDump});
        response = new Response(options);
      }));

      it('should have expected doctors (then)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getDoctors().toPromise()
           .then(doctors => {
            expect(doctors.length).toBe(docDump.length,
              'should have expected no. of doctors');
          });
      })));

      it('should have expected doctors as per dump (Observable.do)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getDoctors()
          .do(doctors => {
            expect(doctors.length).toBe(docDump.length,
              'should have expected no. of doctors');
          })
      })));


      it('should be OK returning no doctors', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 200, body:  []}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.getDoctors()
          .do(heroes => {
            expect(heroes.length).toBe(0, 'should have no doctors');
          })
          .toPromise();
      })));
  });

  describe('when searchHeroes', () =>{
    let backend: MockBackend;
      let service: DocDetailService;
      let docDump: Doctor[];
      let response: Response;
      let searchString :string;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new DocDetailService(http);
      docDump = DOCTORS();
      docDump = docDump.slice(2,3);
      let options = new ResponseOptions( {status: 200, body : docDump});
      response = new Response(options);
    }));

    it('should have expected doctors (then)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.searchDoctor(searchString)
          .do(heroes => {
            expect(heroes.length).toBe(docDump.length,
              'should have expected no. of doctors');
          });
      })));

  })
});