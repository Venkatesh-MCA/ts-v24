import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'

import { imagepath, headerimage } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { FacultypapersService } from '../../../core/services/facultypapers.service';
@Component({
  selector: 'app-facultypapers',
  templateUrl: './facultypapers.component.html',
  styleUrls: ['./facultypapers.component.css']
})
export class FacultypapersComponent {
  logchangeddata: any;
  templateslist: any;
  selectcampus: any;
  templaterec: any;
  filtertext: any;
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 200;

  searchText: string = '';

  allData: any[] = [];
  campusname: string = 'All';
  selectedCampus: any;
  start: number = 0;
  end: number = 10;
  ind: number = 0;

  formateddata: any;
  totalques: any;
  constructor(private _facultypaperservice: FacultypapersService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {

    this.logchangeddata = sessionStorage.getItem('logindata');
    this.logchangeddata = JSON.parse(this.logchangeddata);
    console.log(this.logchangeddata.user_info[0])
    //this.selectedCampus=this.logchangeddata.user_info[0].campus_name;
    this.campusname = this.logchangeddata.user_info[0].campus_name.replace(/\s+/g, '');
    //this.selectcampus(this.selectedCampus.replace(/\s+/g, ''));
    this.showalltemplates(this.logchangeddata.user_info[0].user_id, this.itemsPerPage, this.currentPage)
  }
  showalltemplates(usrid: any, itemperpage: any, currentpage: any) {
    this._facultypaperservice.gettemplates(usrid, itemperpage, currentpage).subscribe(templatesdata => {
      console.log(templatesdata)
      this.templateslist = templatesdata;





    });
  }
  gotosetpaper() {

    this.router.navigate(['/facultysetpaper']);
  }

  showdetails(uid: any) {

    this._facultypaperservice.gettemplate(uid).subscribe(data => {
      console.log(data)
      this.templaterec = data[0];
      this.totalques = this.templaterec.questions.length;
      this.formateddata = this.selectedqueformat(this.templaterec.questions);
    });
  }

  searchdatafilter(x: any) {
    this.filtertext = x;
    if (this.filtertext.length > 5) {
      this.searchpapercode(this.filtertext);
      //this.campusname='All';
      this.campusname = this.campusname;
    } else if (this.filtertext.length < 1) {
      this.showalltemplates(this.selectedCampus, this.itemsPerPage, this.currentPage)
    }
  }
  searchpapercode(uid: any) {
    // // console.log('search here')
    this._facultypaperservice.searchtemplate(uid).subscribe(data => {
      // // console.log(data)
      if (data.length != 0) {
        this.templateslist = data;
        // // console.log(this.examlist);
      } else {
        // // console.log('no search recotd');
        this.templateslist = '';
      }

    });
  }


  selectedqueformat(selQues: any) {
    var questions = []; var finalobj = []; var setfinal = []; var NoofQues = 0; var outputArray = [];
    questions = selQues;
    var unisubs = this.getUniqeElements(questions, 'subject_master_name')
    var setobj = [];
    for (var s = 0; s < unisubs.length; s++) {
      var subjedata = questions.filter((e: any) => e.subject_master_name == unisubs[s])
      var topicsdata = this.getUniqeElements(subjedata, 'topic_master_name')
      var qtypesdata = this.getUniqeElements(subjedata, 'question_type_name')
      //console.log(subjedata)
      //console.log(topicsdata)
      // this.subjectObj = {
      //     "subject": unisubs[s],
      //     "Totalques":questions.filter((z:any) => z.subject_master_name == unisubs[s]).length,
      //     "Topics": []
      // };
      for (var t = 0; t < topicsdata.length; t++) {
        // this.topicObj = {
        //     "Topicname": topicsdata[t],
        //     "TotalTopicQues":questions.filter((z:any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t]).length,
        //     "Qtype": []
        // };

        for (var y = 0; y < qtypesdata.length; y++) {
          //console.log(topicsdata[t], unisubs[s], qtypesdata[y])
          setobj[s] = {
            "Subject": unisubs[s],
            "TopicName": topicsdata[t],
            "qtype": qtypesdata[y],
            "Easy": questions.filter((z: any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Easy').length,
            "Average": questions.filter((z: any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Average').length,
            "Diff": questions.filter((z: any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Difficulty').length,
            "VeryDiff": questions.filter((z: any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Very Difficulty').length,

            "TotalQues": (questions.filter((z: any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Easy').length) +
              (questions.filter((z: any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Average').length) +
              (questions.filter((z: any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Difficulty').length) +
              (questions.filter((z: any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Very Difficulty').length)
          }

          // console.log(setobj[s])
          setfinal.push(setobj[s])
          //this.topicObj.Qtype.push(this.qtypeObj);

        }
        // this.subjectObj.Topics.push(this.topicObj);
      }
      // outputArray.push(this.subjectObj);
    }
    return setfinal;
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
    this.showalltemplates(this.logchangeddata.user_info[0].user_id, this.itemsPerPage, this.currentPage)
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
  getSumElements(obj: any, field: any) {
    //console.log(obj);
    var total = 0;
    for (var i in obj)
      total += Number(obj[i][field]);
    return total;
  }
}
