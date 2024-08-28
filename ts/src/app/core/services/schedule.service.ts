import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL,  pdfURL,PDFURL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private readonly _http: HttpClient, private readonly _router: Router) { 
  }
  ScheduleList(papercode:any): Observable<any> {
    return this._http.get<any>(apiURL+'schedules/'+papercode);
  }
  Scheduleview(papercode:any,mngid:any): Observable<any> {
    return this._http.get<any>(apiURL+'schedules/'+papercode+'/'+mngid);
  }
  vifrtualgroupstrength(vgids:any): Observable<any> {
    console.log(vgids)
    return this._http.post<any>('http://10.70.3.135:5002/studetgroup/campusinfo',{"vgids":vgids});
  }
  CreateSchedule(obj:any): Observable<any> {
      return this._http.post<any>(apiURL+'schedules/',obj);
  }
}
