import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL,PDFURL } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class MarkdetailsService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) { 

    
  }
  markdetailslist(program:string): Observable<any> {
    return this._http.get<any>(apiURL+'markdetails/'+program);
  }
}
