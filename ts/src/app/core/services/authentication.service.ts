import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL, loginapiURL,  pdfURL,PDFURL } from 'src/environments/environment';
import { PaperSize } from 'exceljs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) { }

  login(obj: any): Observable<any> {
    //return this._http.get<any>(loginapiURL+'analysisusers?email='+obj);
     
    return this._http.get<any>(loginapiURL+'?email='+obj);
  }
  // validatelogin(body: any): Observable<any> {
  //   // // console.log(`${itstore}/login/checklogin`);
  //   return this._http.post<any>(`${loginapiURL}/login/checklogin`, body);
  // }
  // user_store_details(user_id: string): Observable<any> {
  //   return this._http.get<any>(`${loginapiURL}/users/userinfo/${user_id}`);
  // }

  // Totalstudents(): Observable<any> {
  //   return this._http.get<any>(apiURL+'abhyasdeshboard/students');
  // }
  // Totalgrandtest(): Observable<any> {
  //   return this._http.get<any>(apiURL+'abhyasdeshboard/grandtests');
  // }
  // Totalpapers(): Observable<any> {
  //   return this._http.get<any>(apiURL+'abhyasdeshboard/papers');
  // }
  // TotalQuestions(): Observable<any> {
  //   return this._http.get<any>(apiURL+'abhyasdeshboard/questionbank');
  // }
  downloadpdf(SetObjurl: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    //return this._http.post<any>('https://apis.aditya.ac.in/url2pdf/render',SetObjurl);
    return this._http.post(pdfURL, SetObjurl, {
      headers: headers,
      observe: 'response',
      responseType: 'arraybuffer',
    });
  }
  downloadquestionpaperpdf(SetObjurl: any): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    return this._http.post(PDFURL, SetObjurl, {
      //headers: headers,
      observe: 'response',
      responseType: 'arraybuffer',
    });
  }

  examList(pagesize: number, pageno: number): Observable<any> {
    // console.log(pagesize, pageno)
    return this._http.get<any>(apiURL+'examschedules/list/' + pagesize + '/' + pageno);

  }
  result(papercode: any,campus:any,pagesize: number, pageno: number): Observable<any> {    
    return this._http.get<any>(apiURL+'examresult/result/' + papercode+'/'+campus+'/'+pagesize+'/'+pageno)
  }

//latest
latestresult(inst:any,papercode: any,campus:any): Observable<any> {    
  return this._http.get<any>(apiURL+'examresult/latest/'+inst+'/'+ papercode+'/'+campus)
  //return this._http.get<any>('http://localhost:4000/admin/examresult/latest/' + papercode+'/'+campus)
}

  examstatuscount(papercode: any,branch:any): Observable<any> {    
    return this._http.get<any>(apiURL+'examresult/examstatus/' + papercode+'/'+branch)
  }
  
  qrresult(papercode: any): Observable<any> {
    return this._http.get<any>(apiURL+'examresult/qrresult/' + papercode)
  }
  // rankresult(obj: any): Observable<any> {
  //   return this._http.post<any>(studentrankingurl, obj)
  // }

 
 
  logout(): void {
    sessionStorage.clear();
    window.location.href = "/login";
  }
 
}
