import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL, PDFURL } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ExampapersService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) {


  }
  getexampapers(selectedCampus: any, itemper: any, currpag: any): Observable<any> {
    return this._http.get<any>(apiURL + 'papers//list/qpapers/' + selectedCampus + '/' + itemper + '/' + currpag);
  }

  searchpaper(papecode: any) {
    return this._http.get<any>(apiURL + 'papers/search/' + papecode);
  }
  // insertexampaper(obj:any): Observable<any>{
  //   return this._http.post<any>(apiURL+'savepaper/tagwise/',obj)
  // }
  InsertExampapeMmongo(obj: any): Observable<any> {
    return this._http.post<any>(apiURL + 'papers', obj)
  }
  questiontypes(): Observable<any> {
    return this._http.get<any>(apiURL + 'questiontypes')
  }
  pickquestion(obj: any): Observable<any> {
    return this._http.post<any>(apiURL + 'savepaper/pickme', obj)
  }
  shufflequestion(obj: any): Observable<any> {
    return this._http.post<any>(apiURL + 'savepaper/shuffle', obj)
  }
  updatepaper(obj: any): Observable<any> {
    return this._http.post<any>(apiURL + 'savepaper', obj)
  }
  updatpaper_mngo(obj: any, mngid: any): Observable<any> {
    return this._http.post<any>(apiURL + 'papers/' + mngid, obj)
  }
  lock_paper(papercode: any, lockstatus: any): Observable<any> {
    return this._http.get<any>(apiURL + 'savepaper/lock/' + papercode + '/' + lockstatus)
  }


}
