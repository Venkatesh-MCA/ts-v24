import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL,  pdfURL,PDFURL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PapersService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) { 
    
  }
  // paperinfo(papercode:any): Observable<any> {
  //   return this._http.get<any>(apiURL+'papers/paperinfo/'+papercode);
  // }
  papersList(campus:any,pagesize: number, pageno: number): Observable<any> {
    return this._http.get<any>(apiURL+'papers/'+campus+'/'+pagesize+'/'+pageno);
  }
  getpaper(papercode:any): Observable<any> {
    return this._http.get<any>(apiURL+'papers/'+papercode);
  }
  getpapermysqlquery(papercode:any): Observable<any> {
    return this._http.get<any>(apiURL+'savepaper/'+papercode);
  }
  virtualgrouplist(instID:any): Observable<any> {
    
    return this._http.get<any>('https://apis.aditya.ac.in/zoom/v23/api/vg/group/list/'+instID);
  }
 
}
