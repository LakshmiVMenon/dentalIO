import { XHRBackend, Response, ResponseOptions, HttpModule, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe ('LoginService', () =>{
    beforeEach( async( () => {
        TestBed.configureTestingModule({
            providers:[LoginService,
                        {provide : XHRBackend, useClass: MockBackend}
                    ],
            imports:[HttpModule]
        })
        .compileComponents()
    }))

    it('can instantiate login service when inject service',
        inject([LoginService],(service:LoginService) =>{
            expect(service instanceof LoginService).toBe(true);
    })) 

    it('can instantiale loginSevice with injecting http', inject([Http],(http:Http) =>{
        expect(http).not.toBeNull('http should be provided');
        let service = new LoginService(http);
        expect(service instanceof LoginService).toBe(true, 'New service is fine');
    }))

    it('can inject MockBackend', inject([XHRBackend],(backend:MockBackend) =>{
        expect(backend instanceof MockBackend).not.toBeNull('Backend is not null');
    }))

    // describe('when Login()' , () =>{
    //     let backend : MockBackend;
    //     let service : LoginService;
    //     let response : Response;

    //     beforeEach(inject([Http, XHRBackend],(http:Http, be:MockBackend) => {
    //         backend = be;
    //         service = new LoginService(http);

    //     }))
    // })
})