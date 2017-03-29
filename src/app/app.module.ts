import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {enableProdMode} from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { DocDetailComponent } from './docdetail.component'

import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './login.service';
import { DocDetailService } from './docdetail.service';

import { SliderTrackDirective } from './sliderTrack.directive';
import { LeftKnobDirective } from './leftknob.directive';
import { RightKnobDirective } from './rightknob.directive';
import { SliderRangeDirective } from './sliderrange.directive';


enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DocDetailComponent ,
    SliderTrackDirective,
    LeftKnobDirective,
    RightKnobDirective,
    SliderRangeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    DocDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
