import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { DownloadpaperService } from '../../../core/services/downloadpaper.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { ActivatedRoute } from '@angular/router';
import { animate } from '@angular/animations';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  loadingbtn: boolean = true;
  stuResult: any = [];
  selectpapercode: any;
  finalobj: any;
  SubjectNames: any;
  totalMAx: any;
  sheaderobj: any = [];
  searchText: string = '';
  filtertext: any = '';
  ExamStatusData: any;
  TotalCnt: any;
  RankArray: any = [];
  subjrnks: any;

  allData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 50;
  totalItems: number = 1000;

  //campusname: string = 'All';
  selectedCampus: string = 'All';
  start: number = 0;
  end: number = 10;
  ind: number = 0;

  baseurl: any;
  setstatusobj: any
  unicbranch: any;
  logchangeddata:any;
  sesinst:any;
  constructor(private _authenticationService: AuthenticationService, private fb: FormBuilder, private route: ActivatedRoute, private _downloadpaperService: DownloadpaperService) {
    this.baseurl = (window.location.protocol + '//' + window.location.hostname + window.location.pathname)
    this.baseurl = this.baseurl.substr(0, this.baseurl.length - 1);
    // console.log(this.baseurl)
    this.selectpapercode = route.snapshot.params['papercode'];
    // console.log(this.selectpapercode)
    this.logchangeddata = sessionStorage.getItem('logindata');
    this.logchangeddata = JSON.parse(this.logchangeddata);
    // console.log(this.logchangeddata.user_info[0].campus_name)
    this.sesinst=this.logchangeddata.user_info[0].institute_code
    //this.selectedCampus=this.logchangeddata.user_info[0].campus_name;
    //this.selectedCampus=this.selectedCampus.replace(/\s+/g, '')
    //this.filtertext=this.selectedCampus;
    this.sesinst=this.sesinst.toLowerCase();
    this.exanStatuscount(this.selectpapercode,this.selectedCampus)
    this.Result(this.sesinst,this.selectpapercode, this.selectedCampus, this.itemsPerPage, this.currentPage)
  
    //this.searchdatafilter(this.selectedCampus)
  }

  exanStatuscount(p: any,branch:any) {   
    // console.log(branch)  
    this._authenticationService.examstatuscount(p,branch).subscribe(statuscnt => {
      // console.log(statuscnt)
      this.ExamStatusData = statuscnt;
      // console.log(this.ExamStatusData.filter((e: any) => e._id == 'Continue'))
      this.TotalCnt = this.getSumElements(this.ExamStatusData, 'count')

      this.setstatusobj = [
        { "name": "Started", "noofstds": this.ExamStatusData.filter((e: any) => e._id == 'Started') != '' ? this.ExamStatusData.filter((e: any) => e._id == 'Started')[0].count : 0 },

        { "name": "Continue", "noofstds": this.ExamStatusData.filter((e: any) => e._id == 'Continue') != '' ? this.ExamStatusData.filter((e: any) => e._id == 'Continue')[0].count : 0 },

        { "name": "Completed", "noofstds": this.ExamStatusData.filter((e: any) => e._id == 'Completed') != '' ? this.ExamStatusData.filter((e: any) => e._id == 'Completed')[0].count : 0 },

        { "name": "Total", "noofstds": this.TotalCnt },
      ]
      // console.log(this.setstatusobj)
      this.setstatusobj=this.setstatusobj.filter((e:any)=>e.noofstds>0)
      //this.ExamStatusData.push({"_id":"Total","count":this.TotalCnt});
    })
  }

  Result(inst:any,papercode: any, campus: any, itemper: any, currpag: any) {
    // console.log(campus)
    this.exanStatuscount(papercode,campus)
    this.selectedCampus=campus;
    // console.log(papercode,campus,itemper,currpag)
    
    this._authenticationService.latestresult(inst,papercode,campus).subscribe(resultdata => {

      // console.log(resultdata)
      if (resultdata.Status == 200) {
        
        this.stuResult = resultdata.Data;
        this.sheaderobj = resultdata.sheaderobj;
        this.unicbranch = this.getUniqeElements(this.stuResult, 'stu_branch')
        // this.SubjectNames = this.getUniqeElements(this.stuResult[0].data, 'subject_master_name');

        // this.sheaderobj = [];
        // for (var t = 0; t < this.SubjectNames.length; t++) {
        //   var m = 0;
        //   var stD = this.stuResult[0].data.filter((l: any) => l.subject_master_name == this.SubjectNames[t]);
        //   //// console.log(stD);
        //   for (var s = 0; s < stD.length; s++) {
        //     var qmax = this.stuResult[0].schema.filter((e: any) => e.qtype == stD[s].question_master_type);
        //     m = m + parseInt(qmax[0].positive);
        //     this.sheaderobj[t] = {
        //       "sujbectname": this.SubjectNames[t],
        //       "MAxmarks": m
        //     };

        //   }

        // }
        //  // console.log(this.sheaderobj);
        // this.totalMAx = this.getSumElements(this.sheaderobj, 'MAxmarks');
      }


    });
  }
  download_qanalysis(suc: any, papec: any) {

    // console.log(suc, papec);
    var SetObjurl = {
      //"url": "https://touchstone.aditya.ac.in/junior/v23/reportcard/qstrike.html?papercode=" + papec + "&succode=" + suc,
      "url": this.baseurl + "/#/quesanalysis/" + papec + "/" + suc,
      "output": "pdf",
      "emulateScreenMedia": true
    };
    //$hhttp.post('https://apis.aditya.ac.in/url2pdf/render',SetObjurl,{responseType:'arraybuffer'}).success(function(response){
    //// console.log(response);
    this._downloadpaperService.donwloadpdf(SetObjurl, 'Ques_analysis' + papec + '_' + suc)
    // this._authenticationService.downloadpdf(SetObjurl).subscribe((response: HttpResponse<any>) => {
    //   // console.log('Response:', response.body);
    //   this.downloadBlob(response.body, 'Ques_analysis' + papec + '_' + suc);
    // });

    // $scope.Downlaoddiv=false;
    // });
  }

  download_question(papec: any) {
    var dbfilename = papec + ".pdf";
    var setobj = {
      "filename": dbfilename,
      "uploadPath": "/touchstone"
    }
    this._authenticationService.downloadquestionpaperpdf(setobj).subscribe((response: HttpResponse<any>) => {
      // console.log('Response:', response.body);
      this.downloadBlob(response.body, dbfilename);
    });

  }
  downloadFile(Blob: any, p: any): void {
    // Fetch your blob or create it as needed
    const blob = new Blob(['Hello, World!'], { type: 'application/pdf' });

    // Use the download service to download the blob
    this.downloadBlob(blob, 'example.pdf');
  }
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
  toggleDisplay() {
    this.loadingbtn = !this.loadingbtn;
  }
  secondsToMinutesAndSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
  }
  secondsToHoursMinutesSeconds(seconds: number): string {
    //// console.log(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
    // Alternatively, if you want to include labels:
    // return `${hours} hours, ${minutes} minutes, and ${remainingSeconds} seconds`;
  }
  getUniqeElements(obj: any, field: any) {
    var elements = [];
    for (var i in obj) {
      if (elements.indexOf(obj[i][field]) == -1) {
        elements.push(obj[i][field]);
      }
    }
    return elements;
  }
  getSumElements(obj: any, field: any) {
    //// console.log(obj);
    var total = 0;
    for (var i in obj)
      total += Number(obj[i][field]);
    return total;
  }

  convertMinutesToHoursMinutesSeconds(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const seconds = remainingMinutes * 60;

    // Format the result as "hours:minutes:seconds"
    const formattedTime = `${hours}:${String(remainingMinutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return formattedTime;
  }
  searchdatafilter(x: any) {
    // console.log(x)
    if(x=='' || x==null || x=="null" || x=='All'){
      this.filtertext='';
      this.exanStatuscount(this.selectpapercode,'All')
      this.Result(this.sesinst,this.selectpapercode, 'All', this.itemsPerPage, this.currentPage)
    }else{
      this.filtertext = x;
      this.exanStatuscount(this.selectpapercode,this.filtertext)
      //this.searchText = x;
      this.Result(this.sesinst,this.selectpapercode, this.filtertext, this.itemsPerPage, this.currentPage)
    }

    
     
  }
  


  //******* Custom Pagination code start here **************/
  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allData.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    // console.log(this.currentPage);
    this.Result(this.sesinst,this.selectpapercode, this.selectedCampus, this.itemsPerPage, this.currentPage)
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get defaultPages(): number {
    // Set the default number of pages (e.g., 10)
    return 50;
  }

  get pages(): number[] {
    const totalVisiblePages = Math.min(this.defaultPages, this.totalPages);
    return new Array(totalVisiblePages).fill(0).map((_, index) => index + 1);
  }

  exportexcel(selecpape:any): void {
    this.stuResult.forEach((item: any, index: any) => {
      item.finalsummary.forEach((element: any) => {
        item[element.SubjectName + '_R'] = element.R;
        item[element.SubjectName + '_W'] = element.W;
        item[element.SubjectName + '_L'] = element.L;
        item[element.SubjectName + '_Marks'] = element.M;
        item[element.SubjectName + '_T'] = element.T;
        item[element.SubjectName + '_Rank'] = element.rank;
        item['Rank'] = element.total_rank;
        //item.subjectname=element.SubjectName;
      });
    });
  //   let array = [
  //     { id: 1, name: 'John', age: 25 },
  //     { id: 2, name: 'Jane', age: 30 },
  //     { id: 3, name: 'Bob', age: 22 },
  //     // ... more objects
  // ];
  
  //remove unwanted columns
  let columnsToRemove = ['finalsummary', '_id','count','duration'];
  
   this.stuResult = this.stuResult.map((item:any) => {
      let newItem = { ...item }; // Create a shallow copy of the original object
  
      // Remove specified columns
      columnsToRemove.forEach(column => {
          delete newItem[column];
      });
  
      return newItem;
  });
  
  //// console.log(this.stuResult);
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Create a sheet for the main table
    const mainSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.stuResult);
    XLSX.utils.book_append_sheet(wb, mainSheet, 'MainTable');


    // Save the workbook to an Excel file
    XLSX.writeFile(wb, selecpape+'.xlsx');
    window.location.reload();
    //  this.stuResult.forEach((item:any, index:any) => {     
    //   item.finalsummary.forEach((element:any) => {
    //     item[element.SubjectName + '_T']=element.T;
    //     item[element.SubjectName + '_Marks']=element.M;
    //     item[element.SubjectName + '_R']=element.R;
    //     item[element.SubjectName + '_W']=element.W;
    //     item[element.SubjectName + '_L']=element.L;

    //     item[element.SubjectName + '_SubjectRank']=element.rank;
    //     item[element.SubjectName + '_Rank']=element.total_rank;
    //     item.subjectname=element.SubjectName;
    //   });    
    //  });
    //  // console.log(this.stuResult)
  }

  limittos(ind: any, start: number, end: number) {
    //if(ind!=50){
    this.ind = ind;
    this.start = this.end;
    this.end += 10;

    this.currentPage = this.start + 1;
    this.onPageChange(this.currentPage)
    //}
    //// console.log(this.ind)
    return this.ind;
  }
  limittoprev(ind: any, start: number, end: number) {
    //if(ind-1!=50){
    this.ind = ind;
    this.start -= 10;
    this.end -= 10;
    //}
    this.currentPage = this.start + 1;
    this.onPageChange(this.currentPage)
    //// console.log(this.ind)
    return this.ind;
  }
  //******* Custom Pagination code end here **************/
}