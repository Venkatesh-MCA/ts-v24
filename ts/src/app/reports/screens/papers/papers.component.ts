import { Component } from '@angular/core';
import { Router } from '@angular/router';

//import { AuthenticationService } from '../../../core/services/authentication.service';
import { PapersService } from '../../../core/services/papers.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { DownloadpaperService } from '../../../core/services/downloadpaper.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent {
  submitted = false;
  searchform: FormGroup;
  pptform: FormGroup
  paperslist: any;
  searchText: string = '';
  filtertext: any;
  branchlistData: any;
  selectpapercode: any; unisubjects: any; selectsubject: any;


  allData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 100;
  totalItems: number = 1000;

  campusname: string = 'All';
  selectedCampus: string = 'All';
  start: number = 0;
  end: number = 10;
  ind: number = 0;

  baseurl:any;
  constructor(private _papersService: PapersService, private _dashboardService: DashboardService, private _downloadpaperService: DownloadpaperService, private fb: FormBuilder, private route: ActivatedRoute,private router: Router) {
    this.searchform = this.fb.group({
      searchname: ['', [Validators.required]],
    });

    this.pptform = this.fb.group({
      selectpapercode: [this.selectpapercode, [Validators.required,]],
      selectsubject: ['', [Validators.required]],

    })



    this.showpaperslist(this.selectedCampus, this.itemsPerPage, this.currentPage)
    //Total branches
    this._dashboardService.TotalBranches().subscribe(branchlistdata => {
      //// console.log(branchlistdata);
      this.branchlistData = branchlistdata;
      this.branchlistData = this.branchlistData.value.filter((e: any) => e._id != null)
    });
  }

  selectcampus(campus: any) {
    // console.log(campus)
    this.selectedCampus = campus;
    this.showpaperslist(this.selectedCampus, this.itemsPerPage, this.currentPage)
  }

  ppt_dialog(p: any) {
    // console.log(p);
    this.selectpapercode = p;
    var rec = this.paperslist.filter((g: any) => g.papercode == this.selectpapercode)
    // console.log(rec)
    this.unisubjects = this.getUniqeElements(rec[0].question_paper, 'subject_master_name')
    // console.log(this.unisubjects)
    this.selectsubject = this.unisubjects[0]
  }
  selectingsub(sub: string) {
    // console.log(sub)
    this.selectsubject = sub
  }
  onSubmit() {

    this.submitted = true;

    if (this.pptform.invalid) {
      return
    } else {
      // console.log(this.pptform.value);
      //this.senddata();
      //this.loadingbtn=true;
      this.submitted = true;
    }
  }
  download_ppt(p: any, s: any) {
    this.baseurl= (window.location.protocol+'//'+window.location.hostname + window.location.pathname)
    this.baseurl=this.baseurl.substr(0, this.baseurl.length - 1);
    // console.log(this.baseurl)
    // console.log(p, s)
    let subject = s.replace(' ', "%20");
    var url = this.baseurl+"/#/pptpaper/" + p + "/" + s
    var obj = {
      "papercode": p,
      "subject": s,
      "url": url
    };

    this._downloadpaperService.pptdownload(obj)

  }
  downoad_ppthints(p: any, s: any) {
    this.baseurl= (window.location.protocol+'//'+window.location.hostname + window.location.pathname)
    this.baseurl=this.baseurl.substr(0, this.baseurl.length - 1);     
    var url = this.baseurl+"/#/ppthintspaper/" + p + "/" + s
    this._downloadpaperService.moveppthintspaper(url,p,s)
    
  }
  download_videolist(p: any, s: any) {
    this.baseurl= (window.location.protocol+'//'+window.location.hostname + window.location.pathname)
    this.baseurl=this.baseurl.substr(0, this.baseurl.length - 1);
    var SetObjurl = {
      //"url": "https://touchstone.aditya.ac.in/junior/v23/videouploads/videolist.html?papercode=" + p + "&subject=" + s,
      "url":this.baseurl+"/#/videolist/"+p+"/"+s,
      "output": "pdf",
      "emulateScreenMedia": true
    };
    var filename=p+'_'+s+'_videolist.pdf'
    this._downloadpaperService.donwloadpdf(SetObjurl,filename);
  }

  videoform(p:any,s:any){

    this.router.navigate(['videoform/'+p+'/'+s]);
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
  //Search text function
  searchdatafilter(x: any) {
    this.filtertext = x;
  }

  //******* Custom Pagination code start here **************/
  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allData.slice(startIndex, endIndex);
  }

  download_questionpaper(papec: any, papertype: any) {
    this._downloadpaperService.downloadfile(papec, papertype);
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    // console.log(this.currentPage);
    this.showpaperslist(this.selectedCampus, this.itemsPerPage, this.currentPage)
  }
  //PapersList function
  showpaperslist(selectedCampus: any, itemper: number, currpag: number) {
    // console.log(itemper, currpag)
    this._papersService.papersList(selectedCampus, itemper, currpag).subscribe(data => {
      this.paperslist = data;
      // console.log(this.paperslist);
    });
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
}
