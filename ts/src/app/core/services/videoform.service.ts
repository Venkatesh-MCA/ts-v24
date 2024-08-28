import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL,videofilepath,  pdfURL,PDFURL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VideoformService {
  constructor(private readonly _http: HttpClient, private readonly _router: Router) { 
    
  }
  videoproecessexists(p:any,s:any): Observable<any> {   
     
   return this._http.get<any>(apiURL+'videoform/'+p+'/'+s);
 }
  videoproecess(sendobj:any): Observable<any> {
     //// console.log(apiURL+'videoform/videoprocess')
    return this._http.post<any>(apiURL+'videoform/videoprocess',sendobj);
  }
  folderpaths(p:any){
    return this._http.get<any>(videofilepath+'?papercode='+p);
  }
  videolist(qid:any){
    //// console.log(qid)
    return this._http.post<any>(apiURL+'videolist/list',{"questionids":qid});
  }
}
