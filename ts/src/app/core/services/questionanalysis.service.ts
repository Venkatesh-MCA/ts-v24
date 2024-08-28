import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL,  pdfURL,PDFURL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuestionanalysisService {
  constructor(private readonly _http: HttpClient, private readonly _router: Router) { 
  }
  questionanalysis(papercode:any,succode:any): Observable<any> {
    return this._http.get<any>(apiURL+'questionanalysis/'+papercode+'/'+succode);
  }
  getsubtopicnames(qids:any): Observable<any> {
    return this._http.post<any>(apiURL+'questionanalysis/subtopicnames/',qids);
  }
}
