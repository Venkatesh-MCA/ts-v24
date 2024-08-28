import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL,virtualstudentpurl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) { }

  strengthResult(papercode: any): Observable<any> {
    return this._http.get<any>(apiURL+'attendance/report/' + papercode)
  }
  attendancegroupcodes(papercode: any): Observable<any> {
    return this._http.get<any>(apiURL+'attendance/' + papercode)
  }
  groupiddata(groupid: any): Observable<any> {
    return this._http.get<any>(virtualstudentpurl + groupid)
  }
  insertattendancedata(papercode: any, body: any): Observable<any> {
    return this._http.post<any>(apiURL+'attendance/updateattendance/' + papercode, body)
  }
 
  strength(papercode: any): Observable<any> {
    return this._http.post<any>(apiURL+'examresult/strengthreport',{papercodes:papercode})
  }
}
