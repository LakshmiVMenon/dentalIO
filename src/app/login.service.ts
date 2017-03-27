import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import {LoginUser } from './login-user';


@Injectable()

export class LoginService{
    constructor(private http:Http){}
    private loginURL = "/login";
    private headers = new Headers({'Content-Type': 'application/json'});
    private loginUser:LoginUser;
    
    login(username:string,password:string): Observable<LoginUser>{
    return this.http.post(this.loginURL,JSON.stringify({username: username, password: password }), {headers: this.headers})
            .map(response => response.json() as LoginUser);

    }
}
