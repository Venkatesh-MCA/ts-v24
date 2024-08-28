import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import {  CodingApi } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})

export class ExamresultService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) { }
 
  get_result(suc: any, pp_code: any): Observable<any> { 
    return this._http.get<any>(`${CodingApi}/exams/studentresult/${suc}/${pp_code}`) 
  }

  final_submit(obj: any): Observable<any> {
    return this._http.post<any>(CodingApi+`/exams/studentsubmit`, obj)
  }

  // getNewScheduleList(obj: any): Observable<any> { 
  //   return this._http.post<any>(`${CodingApi}/exams/sheduletotalresult`,obj) 
  // }
  
  getNewScheduleList(obj: any): Observable<any> { 
    return this._http.post<any>(`${CodingApi}/exams/overalexamreport`,obj) 
  }

  getSchedule(): Observable<any> { 
    return this._http.get<any>(`${CodingApi}/schedule/list`) 
  }
  
}