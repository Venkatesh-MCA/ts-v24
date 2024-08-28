import { Component } from '@angular/core';
//import { AuthenticationService } from '../../../core/services/authentication.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { PapersService } from '../../../core/services/papers.service';
import { ScheduleService } from '../../../core/services/schedule.service';
import { DownloadpaperService } from '../../../core/services/downloadpaper.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IdinarupeesPipe } from '../../../idinarupees.pipe';
import { AttendanceService } from '../../../core/services/attendance.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  examlist: any;
  searchform: FormGroup;
  selectedmngid: any;
  selected_paper_groups: any;
  searchText: string = '';
  filtertext: any;
  totalexam: any;
  totalpapers: any;
  totalqdata: any;
  totalstds: any;
  branchlistData: any;

  allData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 0;

  campusname: string = 'All';
  selectedCampus: string = 'All';
  start: number = 0;
  end: number = 10;
  ind: number = 0;

  selectpapercode: any; unisubjects: any; selectsubject: any; baseurl: any; pptbtn: boolean = false; ppthintsbtn: boolean = false; videolistbtn: boolean = false;schedules:any[];
  selectpapertype: any = '';logchangeddata:any;totalschedulesbrnchwise:any;branch_schedule_count:any;totalpapers_int:any;
  constructor(private _dashboardService: DashboardService, private _downloadpaperService: DownloadpaperService, private fb: FormBuilder, private _papersService: PapersService,private _scheduleService:ScheduleService,private _attendanceService: AttendanceService) {
    this.searchform = this.fb.group({
      searchname: ['', [Validators.required]],
    });
    this.logchangeddata = sessionStorage.getItem('logindata');
    this.logchangeddata = JSON.parse(this.logchangeddata);
    // // console.log(this.logchangeddata.user_info[0].campus_name)
    this.selectedCampus=this.logchangeddata.user_info[0].campus_name;
    this.campusname=this.logchangeddata.user_info[0].campus_name.replace(/\s+/g, '');
    this.selectcampus(this.selectedCampus.replace(/\s+/g, ''));
     
    //Exams List function
    this.showexamlist(this.selectedCampus, this.itemsPerPage, this.currentPage)



  }
  ngOnInit() {
    //Total Exams
    this._dashboardService.Totalgrandtest().subscribe(totalexmdata => {
      // // console.log(totalexmdata);
      this.totalexam = totalexmdata;
      this.totalexam = this.totalexam.value.toLocaleString('en-IN');
    });

    //Total papers
    this._dashboardService.Totalpapers().subscribe(totalpapersdata => {
      // // console.log(totalpapersdata);
      this.totalpapers = totalpapersdata;
      this.totalpapers_int=this.totalpapers.value;
      this.totalpapers = this.totalpapers.value.toLocaleString('en-IN');
    });

    //Total Questions
    this._dashboardService.TotalQuestions().subscribe(totalquestionsdata => {
      // // console.log(totalquestionsdata);
      this.totalqdata = totalquestionsdata;
      this.totalqdata = this.totalqdata.value.toLocaleString('en-IN');

    });

    //Total Students
    this._dashboardService.Totalstudents().subscribe(totalstddata => {
      //// console.log(totalstddata);
      this.totalstds = totalstddata;
      this.totalstds = this.totalstds.value.toLocaleString('en-IN');
    });

    //Total branches
    this._dashboardService.TotalBranches().subscribe(branchlistdata => {
      //// console.log(branchlistdata);
      this.branchlistData = branchlistdata;
      this.branchlistData = this.branchlistData.value.filter((e: any) => e._id != null)
    });

     
  }
  selectcampus(campus: any) {
    // // console.log(campus)
    this.selectedCampus = campus;
    this.filtertext='';
    this.searchText='';
    this.itemsPerPage=20; this.currentPage=1;
    this.showexamlist(this.selectedCampus, this.itemsPerPage, this.currentPage)
  }

  //ExamsList function
  showexamlist(selectedCampus: any, itemper: number, currpag: number) {
    // // console.log(selectedCampus,itemper, currpag);
    this._dashboardService.examList(selectedCampus, itemper, currpag).subscribe(data => {
      this.examlist = data;
      // // console.log(this.examlist);
      if(this.examlist!='' && selectedCampus!='All'){
        this.brachwisepapercodes(this.selectedCampus)
      }else{
        // // console.log(this.totalpapers_int)
        this.totalItems=this.totalpapers_int;
      }
      
    });
    
  }

  //show groups on click papercode row
  show_groups(paper: any) {
    // this.selectedmngid = this.examlist.filter((e: any) => e._id == mngid);
    // this.selected_paper_groups = this.selectedmngid[0].groups;
    this._scheduleService.ScheduleList(paper).subscribe(schdata => {
      console.log(schdata)
      this.schedules=schdata
      
      for(var i=0;i<this.schedules.length;i++){         
         
        this.schedules[i].vg_strength=0;
        for(var g=0;g<this.schedules[i].groups.length;g++){
          
          this.getstrengt(i,g,this.schedules[i].groups[g].groupID)
        }
         
      }
      console.log(this.schedules);
    });
  }
  
  getstrengt(inde:any,subind:any,groupID:Number){
    this._attendanceService.groupiddata(groupID).subscribe(sdata => {
      if(sdata.status==200){
        this.schedules[inde].groups[subind].strength=sdata.result.length ; // Initialize strength if it's undefined
        this.schedules[inde].vg_strength+=parseInt(this.schedules[inde].groups[subind].strength)
      }
        
      
      
    });   
  }

  //virtual group report
  vgroup_report(gid:Number){
    console.log(gid)
  }
  //Total schedules branchwise count
  brachwisepapercodes(branch:any){
    
   
      this._dashboardService.Totalscdulepapersbranchwise().subscribe(data => {
        // // console.log(data);
        this.totalschedulesbrnchwise = data;
        //// console.log(branch)
        this.branch_schedule_count = this.totalschedulesbrnchwise.filter((e: any) => e._id == branch)[0].count;
        // // console.log(this.branch_schedule_count)
        this.totalItems=this.branch_schedule_count;
        

      });
    
    
        
    }
    
  

  //ppt functions
  ppt_dialog(btntype: any, p: any) {
    // // console.log(p);
    this.selectpapercode = p;
    this._papersService.getpaper(this.selectpapercode).subscribe(rec => {
      // // console.log(rec)
      this.unisubjects = this.getUniqeElements(rec[0].question_paper, 'subject_master_name')
      // // console.log(this.unisubjects)
      this.selectsubject = this.unisubjects[0]
    });

    if (btntype == 'PPT') {
      this.pptbtn = true;

    } else if (btntype == 'PPThints') {
      this.ppthintsbtn = true;
    } else if (btntype == 'videolist') {
      this.videolistbtn = true;
    }


  }
  selectingsub(sub: string) {
    // // console.log(sub)
    this.selectsubject = sub
  }

  download_ppt(p: any, s: any) {
    this.baseurl = (window.location.protocol + '//' + window.location.hostname + window.location.pathname)
    this.baseurl = this.baseurl.substr(0, this.baseurl.length - 1);
    // // console.log(this.baseurl)
    // // console.log(p, s)
    let subject = s.replace(' ', "%20");
    var url = this.baseurl + "/#/pptpaper/" + p + "/" + subject
    var obj = {
      "papercode": p,
      "subject": subject,
      "url": url
    };

    this._downloadpaperService.pptdownload(obj)

  }
  downoad_ppthints(p: any, s: any) {
    this.baseurl = (window.location.protocol + '//' + window.location.hostname + window.location.pathname)
    this.baseurl = this.baseurl.substr(0, this.baseurl.length - 1);
    var url = this.baseurl + "/#/ppthintspaper/" + p + "/" + s
    this._downloadpaperService.moveppthintspaper(url, p, s)

  }
  download_videolist(p: any, s: any) {
    this.baseurl = (window.location.protocol + '//' + window.location.hostname + window.location.pathname)
    this.baseurl = this.baseurl.substr(0, this.baseurl.length - 1);
    var SetObjurl = {
      //"url": "https://touchstone.aditya.ac.in/junior/v23/videouploads/videolist.html?papercode=" + p + "&subject=" + s,
      "url": this.baseurl + "/#/videolist/" + p + "/" + s,
      "output": "pdf",
      "emulateScreenMedia": true
    };
    var filename = p + '_' + s + '_videolist.pdf'
    this._downloadpaperService.donwloadpdf(SetObjurl, filename);
  }
  //Download Question paper
  download_paper(papertype: any, papec: any) {
    // // console.log(papertype, papec)
    let dbfilename: string = '';
    if (papertype == 'hints') {
      dbfilename = papec + "-" + papertype + ".pdf";
    } else if (papertype == 'questionpaper') {
      dbfilename = papec + ".pdf";
    }
    this._downloadpaperService.pdfdownload(dbfilename, papertype);

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

  //Search text function
  searchdatafilter(x: any) {
    this.filtertext = x;
    if (this.filtertext.length > 5) {
      this.searchpapercode(this.filtertext);
      //this.campusname='All';
      this.campusname=this.campusname;
    } else if (this.filtertext.length < 1) {
      this.showexamlist(this.selectedCampus, this.itemsPerPage, this.currentPage)
    }
  }
  searchpapercode(paper: any) {
    // // console.log('search here')
    this._dashboardService.searchpaper(paper).subscribe(data => {
      // // console.log(data)
      if(data.length!=0){
        this.examlist = data;
        // // console.log(this.examlist);
      }else{
        // // console.log('no search recotd');
        this.examlist='';
      }
      
    });
  }
  //******* Custom Pagination code start here **************/
  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allData.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    // // console.log(this.currentPage);
    this.showexamlist(this.selectedCampus, this.itemsPerPage, this.currentPage)
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



  getUniqeElements(obj: any, field: any) {
    var elements = [];
    for (var i in obj) {
      if (elements.indexOf(obj[i][field]) == -1) {
        elements.push(obj[i][field]);
      }
    }
    return elements;
  }
}
