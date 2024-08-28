import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL,PDFURL } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) { 
    
  }
  Totalstudents(): Observable<any> {
    return this._http.get<any>(apiURL+'abhyasdeshboard/students');
  }
  Totalgrandtest(): Observable<any> {
    return this._http.get<any>(apiURL+'abhyasdeshboard/grandtests');
  }
  Totalpapers(): Observable<any> {
    return this._http.get<any>(apiURL+'abhyasdeshboard/papers');
  }
  TotalQuestions(): Observable<any> {
    return this._http.get<any>(apiURL+'abhyasdeshboard/questionbank');
  }
  TotalBranches(): Observable<any> {
    return this._http.get<any>(apiURL+'abhyasdeshboard/branches');
  }
  Totalscdulepapersbranchwise():Observable<any> {
    return this._http.get<any>(apiURL+'schedules/totalschedules');
  }
  // downloadquestionpaperpdf(SetObjurl: any): Observable<any> {
  //   // const headers = new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   // });
  //   return this._http.post(PDFURL, SetObjurl, {
  //     //headers: headers,
  //     observe: 'response',
  //     responseType: 'arraybuffer',
  //   });
  // }
  examList(campus:any,pagesize: number, pageno: number): Observable<any> {  
    //// console.log(apiURL+'schedules/list/exams/'+campus+'/'+ pagesize + '/' + pageno)   
    return this._http.get<any>(apiURL+'schedules/list/exams/'+campus+'/'+ pagesize + '/' + pageno);

  }
  searchpaper(term:any){
    
    return this._http.get<any>(apiURL+'schedules/search/'+term);
  }
}
