import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL,PDFURL } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TagmastersService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) { 

    
  }
  taglist(): Observable<any> {
    return this._http.get<any>(apiURL+'tagmaster');
  }
  
  tagsubjects(tagname:any): Observable<any> {
    return this._http.get<any>(apiURL+'tagmaster/'+tagname);
  }
 
  tagquestions(obj:any): Observable<any> {
    return this._http.post<any>(apiURL+'tagmaster/tagquestions/',obj);
  }
 
}



 
