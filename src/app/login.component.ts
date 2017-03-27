import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { LoginUser } from './login-user';

@Component({
    moduleId:module.id,
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent{
    constructor(private loginservice:LoginService,
                private router:Router){}
    user: any = {};
    loggedUser :LoginUser; 
    isLoggedIn : Boolean =false;
    error = '';
    errorMsg='';
    headerClass : string = 'headerNavList';

    login(){
        this.loginservice.login(this.user.username,this.user.password)
        .subscribe(result => {
            this.loggedUser = result;
            this.isLoggedIn = result.isloggedin;
            if (this.isLoggedIn) {
                this.router.navigate(['/docdetail']);
            } else {
                this.error = result.errMsg;
                this.errorMsg = this.error;
            }
        });
        
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