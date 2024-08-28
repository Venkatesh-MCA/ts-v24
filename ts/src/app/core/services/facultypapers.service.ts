import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL, PDFURL } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable({
  providedIn: 'root'
})
export class FacultypapersService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) {
  }
  getsubjects(): Observable<any> {
    return this._http.get<any>(apiURL + 'faculty/subjects/');
  }
  gettypes(): Observable<any> {
    return this._http.get<any>(apiURL + 'questiontypes');
  }
  getlelvels(): Observable<any> {
    return this._http.get<any>(apiURL + 'faculty/levels/');
  }
  gettopics(subjectid:any): Observable<any> {
    return this._http.get<any>(apiURL +'faculty/topics/'+subjectid);
  }
  getsubtopics(topicid:any): Observable<any> {
    return this._http.get<any>(apiURL +'faculty/subtopics/'+topicid);
  }
  getquestions(obj:any): Observable<any> {
    return this._http.post<any>(apiURL +'faculty',obj);
  }
  createpaper(obj:any): Observable<any> {
    return this._http.post<any>(apiURL +'faculty/create/',obj);
  }

  gettemplates(userud:any,pagesize:any,pageno:any): Observable<any> {
    return this._http.get<any>(apiURL +'faculty/'+userud+'/'+pagesize+'/'+pageno);
  }
  gettemplate(uid:any): Observable<any> {
    return this._http.get<any>(apiURL +'faculty/'+uid);
  }
  searchtemplate(uid:any): Observable<any> {
    return this._http.get<any>(apiURL +'faculty/search/'+uid);
  }
  
  
}
