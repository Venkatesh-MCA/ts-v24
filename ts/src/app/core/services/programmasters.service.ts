import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL,PDFURL } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable({
  providedIn: 'root'
})
export class ProgrammastersService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) { 

    
  }
  programlist(): Observable<any> {
    return this._http.get<any>(apiURL+'programmaster');
  }
}
