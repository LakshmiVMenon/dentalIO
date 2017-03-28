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

enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DocDetailComponent
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
