import { TestBed, async, inject, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import {By} from "@angular/platform-browser";
import { Http, ConnectionBackend , HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () =>{
    let loginservice, loginServiceStub, spy;
    let comp:    LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;

    beforeEach(async(() =>{
        TestBed.configureTestingModule({
            providers:[ LoginService, Http, ConnectionBackend],
            imports:[ FormsModule, RouterTestingModule, HttpModule ],
            declarations:[ LoginComponent ]
        }).compileComponents();
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.debugElement.componentInstance;
        loginservice = TestBed.get(LoginService);

        spy = spyOn(loginservice, 'login')
                .and.returnValue(Promise.resolve());
                
    });

    it('Login component should be truthy', async(() => {
        expect(comp).toBeTruthy();
    }));

    it('should display the welcome text', async(() => {
        const de = fixture.debugElement.query(By.css('h1'));
        const el = de.nativeElement;
        expect(el.textContent).toContain("Welcome Back");
    }));

    it("tracks that the spy was called", function() {
        spy();
        expect(spy).toHaveBeenCalled();
    });

   it('should show Error when Login fails', () =>{
        spy();
        comp.isLoggedIn = false;
        comp.errorMsg = 'User doesnot exist.'
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('#loginerror'));
        const el = de.nativeElement;
        expect(el.textContent).not.toBe('');
    });
})