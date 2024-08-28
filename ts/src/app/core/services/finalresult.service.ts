import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL,  pdfURL,PDFURL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FinalresultService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) {

  }
  finalresult(inst:any,papercode:any,branch:any): Observable<any> {
    return this._http.get<any>(apiURL+'examresult/finalresult/'+inst+'/'+papercode+'/'+branch);
  }
}
