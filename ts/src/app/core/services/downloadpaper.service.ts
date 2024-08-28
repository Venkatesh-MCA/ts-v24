import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL, pptpath, pdfURL, PDFURL,PDFPOST ,movepdffile} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadpaperService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) {
   
  }

  pdfdownload(dbfilename:any,papertype:any){
    // // console.log(movepdffile)
    var setobj = {
      "filename": dbfilename,
      //"uploadPath": "/touchstone"
      "uploadPath": movepdffile
    }
    this._http.post(PDFURL, setobj, {
      //headers: headers,
      observe: 'response',
      responseType: 'arraybuffer',
    }).subscribe((response: HttpResponse<any>) => {
      // // console.log('Response:', response);
      this.downloadBlob(response.body, dbfilename);
    });;
  }


  downloadfile(papercode: any, papertype: String) {
    
    let dbfilename: string = '';
    if (papertype == 'hints') {
      dbfilename = papercode + "-hints" + ".pdf";
    } else if (papertype == 'question_paper') {
      dbfilename = papercode + ".pdf";
    }

    var setobj = {
      "filename": dbfilename,
      //"uploadPath": "/touchstone"
      "uploadPath": movepdffile
    }
    // // console.log(PDFURL)
    this._http.post(PDFURL, setobj, {
      //headers: headers,
      observe: 'response',
      responseType: 'arraybuffer',
    }).subscribe((response: HttpResponse<any>) => {
      // // console.log('Response:', response);
      this.downloadBlob(response.body, dbfilename);
    });;


  }

  donwloadpdf(setobj: any, filename: string) {
    this._http.post(pdfURL, setobj, {
      //headers: headers,
      observe: 'response',
      responseType: 'arraybuffer',
    }).subscribe((response: HttpResponse<any>) => {
      // // console.log('Response:', response);
      this.downloadBlob(response.body, filename);
    });;
  }

  moveppthintspaper(url:any,p:any,s:any){
    var sendobj = {
      "url": url,
      //"path": "/touchstone/pptpages",
      "path": movepdffile+"/pptpages",
      "format": "A4",
      "filename": p+'_'+s+'_pptpage',
      "pageNumbers":false
      }
    this._http.post(PDFPOST, sendobj, {
      //headers: headers,
      observe: 'response',
      responseType: 'arraybuffer',
    }).subscribe((response: HttpResponse<any>) => {
      // // console.log(response)
      this.downloadppthints(p+'_'+s+'_pptpage.pdf',sendobj.path)
       
    });
  }  


  downloadppthints(filename:any,path:any){
    var setobj={
      "filename":filename,
      "uploadPath":path
      }
      // // console.log(setobj);
      this._http.post(PDFURL, setobj, {
        //headers: headers,
        observe: 'response',
        responseType: 'arraybuffer',
      }).subscribe((response: HttpResponse<any>) => {
        // // console.log('Response:', response);
        this.downloadBlob(response.body, filename);
      });
  }



  pptdownload(sendobj: any) {
    //// console.log(pptpath)
    var dbfilename = sendobj.papercode + '_' + sendobj.subject + '_questions.pptx'
    this._http.post(pptpath, sendobj, {
      //headers: headers,
      observe: 'response',
      responseType: 'arraybuffer',
    }).subscribe((response: HttpResponse<any>) => {
      // // console.log('Response:', response);
      this.downloadBlob(response.body, dbfilename);
    });;
  }
  //question paper download sub function
  downloadFile(Blob: any, p: any): void {
    // Fetch your blob or create it as needed
    const blob = new Blob(['Hello, World!'], { type: 'application/pdf' });

    // Use the download service to download the blob
    this.downloadBlob(blob, 'example.pdf');
  }

  //question paper download sub function
  downloadBlob(blob: Blob, name: string = 'file.pdf'): void {
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //   return window.navigator.msSaveOrOpenBlob(blob);
    // }

    // For other browsers:
    const url = window.URL || window.webkitURL;
    const data = url.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

    const link = document.createElement('a');
    link.href = data;
    link.target = '_blank';
    link.download = name;

    // This is necessary as link.click() does not work on the latest Firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    setTimeout(() => {
      // For Firefox, it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 2000);
  }

}
