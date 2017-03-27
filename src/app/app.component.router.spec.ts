import {Location} from "@angular/common";
import {TestBed, fakeAsync, tick, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import { FormsModule } from '@angular/forms';
import {Router, Routes} from "@angular/router";
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { DocDetailComponent } from './docdetail.component';
import { AppComponent } from './app.component';

let location: Location;
let router: Router;
let fixture :ComponentFixture<AppComponent>;

describe('Router: App', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [
        LoginComponent,
        DocDetailComponent,
        AppComponent
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

//   it('fakeAsync works', fakeAsync(() => {
//     let promise = new Promise((resolve) => {
//       setTimeout(resolve, 10)
//     });
//     let done = false;
//     promise.then(() => done = true);
//     tick(50);
//     expect(done).toBeTruthy();
//   }));

  it('navigate to "" redirects you to ""', fakeAsync(() => {
    location.go('');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('');
  }));

  it('navigate to "docdetail" takes you to /docdetail', fakeAsync(() => {
    location.go('docdetail');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/docdetail');
  }));
});
