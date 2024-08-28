import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodingApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Virtual {

  constructor(private _http: HttpClient) { }

  PostStdData(data: any): Observable<any> {
    return this._http.post<any>(`https://apis.aditya.ac.in/zoom/v23/api/vg/studetgroup/create`, data)
  }
  DelStdData(data: any): Observable<any> {
    return this._http.post<any>(`https://apis.aditya.ac.in/zoom/v23/api/vg/studetgroup/dropstudent`, data)
  }

  getVirtualList(): Observable<any> {
    return this._http.get<any>(`https://apis.aditya.ac.in/zoom/v23/api/vg/group/list/3`)
  }

  getStudentGrp(vg_data: any): Observable<any> {
    return this._http.post<any>(`https://apis.aditya.ac.in/zoom/v23/api/vg/studetgroup/groupstudentlist`, vg_data)
  }

  getvirtualstudents(vg_data: any): Observable<any> {
    return this._http.get<any>(`https://apis.aditya.ac.in/zoom/v23/api/vg/studetgroup/list/` + vg_data)
  }

  getStudentSuc(x: any, catid: any): Observable<any> {
    if (catid == 'student') {
      return this._http.get<any>(`https://apis.aditya.ac.in/abhyas/student/getstudent/` + x)
    } else {
      return this._http.get<any>(`https://abhyas.ai/api/v23/student/getstudentinfo/` + x)
    }
  }
  getScheduleresult(x: any): Observable<any> {
    return this._http.get<any>(CodingApi + `/schedule/getinfo/` + x)
  }

  GetResult(x: any): Observable<any> {
    return this._http.get<any>(CodingApi + `/exams/scheduleresult/` + x)
  }

  update_Result_Status(obj: any): Observable<any> {
    return this._http.post<any>(CodingApi + `/exams/changeexamstatus`, obj)
  }

  getVGCount(): Observable<any> { 
    return this._http.get<any>(`https://apis.aditya.ac.in/zoom/v23/api/vg/studetgroup/groupcount`) 
  }
}
