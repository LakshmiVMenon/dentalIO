import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Doctor } from './doctor';

@Injectable()

export class DocDetailService {
    constructor(private http:Http){}
    
    getDoctors() : Observable <Doctor[]>{
        return this.http.get('/docdetailslist')
                .map(response => {return response.json() as Doctor[]})
                .catch(this.handleError);
    }

    searchDoctor(searchString:string) : Observable <Doctor[]>{
        return this.http.get(`/search?searchString=${searchString}`)
                .map(response => response.json() as Doctor[])
                .catch(this.handleError);
    }

    private handleError(error: any){
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
