import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExampapersService } from '../../../core/services/exampapers.service';
import { TagmastersService } from '../../../core/services/tagmasters.service';
import { ProgrammastersService } from '../../../core/services/programmasters.service';
import { MarkdetailsService } from '../../../core/services/markdetails.service';
import { imagepath, headerimage } from '../../../../environments/environment';
@Component({
  selector: 'app-exampapers',
  templateUrl: './exampapers.component.html',
  styleUrls: ['./exampapers.component.css']
})
export class ExampapersComponent {
  exampaperslist: any; taglist: any; programlist: any; markdetailslist: any; selectedschema: any = []; schemadetails: any; uniqsubjects: any;
  selectedtagques: any = ''; selectedpaperques: any;
  subjectids: any;
  CreateQuestion: FormGroup;
  filtertext: any;
  listdiv: boolean = true;
  formdiv: boolean = false;
  selectedtag: any;

  logchangeddata:any;
 
  searchText: string = '';

  allData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number =200;

  campusname: string = 'All';
  selectedCampus: string = 'All';
  start: number = 0;
  end: number = 10;
  ind: number = 0;
  constructor(private _exampaperservice: ExampapersService, private _tagmasterservice: TagmastersService, private _programmastersservice: ProgrammastersService, private _markdetailservice: MarkdetailsService, private fb: FormBuilder) {
    

    this.logchangeddata = sessionStorage.getItem('logindata');
    this.logchangeddata = JSON.parse(this.logchangeddata);
     console.log(this.logchangeddata.user_info[0].campus_name)
    this.selectedCampus=this.logchangeddata.user_info[0].campus_name;
    this.campusname=this.logchangeddata.user_info[0].campus_name.replace(/\s+/g, '');
    this.selectcampus(this.selectedCampus.replace(/\s+/g, ''));
     
    //Exams List function
    this.showexamlist(this.selectedCampus, this.itemsPerPage, this.currentPage)



    this.CreateQuestion = this.fb.group({
      tagname: ['', [Validators.required]],
      program: ['', [Validators.required]],
      markdetails: ['', [Validators.required]],
      date: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      marks: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      qdata: ['', [Validators.required]]


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


    //Exam papers List function
    showexamlist(selectedCampus: any, itemper: number, currpag: number) {
      // // console.log(selectedCampus,itemper, currpag);
      this._exampaperservice.getexampapers(selectedCampus, itemper, currpag).subscribe(data => {
        this.exampaperslist = data;
         console.log(this.exampaperslist);
       
        
      });
      
    }


  //get exampapers
  // Getexampapers() {
  //   this._exampaperservice.getexampapers(prgram).subscribe(expdata => {
  //     //// console.log(totalstddata);
  //     this.exampapersdata = expdata;
  //     console.log(this.exampapersdata)
  //   });
  // }

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
      this._exampaperservice.searchpaper(paper).subscribe(data => {
        // // console.log(data)
        if(data.length!=0){
          this.exampaperslist = data;
          // // console.log(this.examlist);
        }else{
          // // console.log('no search recotd');
          this.exampaperslist='';
        }
        
      });
    }
  getalltags() {

    this._tagmasterservice.taglist().subscribe(tagdata => {
      //console.log(tagdata);
      if (tagdata.msg == "Success") {
        this.taglist = tagdata.tags;
        //console.log(this.taglist);
      }

    });
  }

  getprograms() {


    this._programmastersservice.programlist().subscribe(prgmdata => {
      //console.log(prgmdata);
      if (prgmdata.msg == "Success") {
        this.programlist = prgmdata.programs;
      }


    });
  }

  getmarkdetails(x: any) {

    var program = x.target.value
    this._markdetailservice.markdetailslist(program).subscribe(data => {
      console.log(data);

      this.markdetailslist = data[0].Patterns;


    });
  }

  viewdetails(id: any) {
    console.log(id)
    var selectedid = id.target.value;
    this.selectedschema = this.markdetailslist.filter((e: any) => e.title == selectedid)[0];
    this.schemadetails = this.selectedschema.patterndetails;
    console.log(this.selectedschema)
  }

  GetQpaper() {

    var sendobj = {
      "tagname": [this.CreateQuestion.value.tagname],
      "subject_id": "1,2,3",
      "suborder": "1,2,3",
      "question_type_id": false //false
    }
    this.selectedtag = this.CreateQuestion.value.tagname;
    this._tagmasterservice.tagsubjects(this.CreateQuestion.value.tagname).subscribe(data => {
      console.log(data);
      if (data.msg == "Success") {
        this.uniqsubjects = data.subjectsdata;


        console.log(this.uniqsubjects);
        this.subjectids = this.uniqsubjects.map((e: any) => e.subjectid);
        console.log(this.subjectids)
      }




    });

  }

  changePosition(order: any, idToMove: any, newPosition: any) {
    const indexToMove = this.uniqsubjects.findIndex((item: { sorder: any; }) => item.sorder === idToMove);
    const indexNewPosition = this.uniqsubjects.findIndex((item: { sorder: any; }) => item.sorder === newPosition);

    if (indexToMove === -1 || indexNewPosition === -1) {
      console.log("Invalid id(s).");
      return this.uniqsubjects;
    }

    // Swap id values
    const tempId = this.uniqsubjects[indexToMove].sorder;
    this.uniqsubjects[indexToMove].sorder = this.uniqsubjects[indexNewPosition].sorder;
    this.uniqsubjects[indexNewPosition].sorder = tempId;

    // Swap objects in the array
    const tempObject = this.uniqsubjects[indexToMove];
    this.uniqsubjects[indexToMove] = this.uniqsubjects[indexNewPosition];
    this.uniqsubjects[indexNewPosition] = tempObject;
    console.log(this.uniqsubjects)
    return this.uniqsubjects;
  }

  ShowQuestionsData() {
    console.log(this.subjectids)
    var suborders = this.uniqsubjects.map((e: any) => e.sorder);
    var subjectidlist = this.uniqsubjects.map((e: any) => e.subjectid)


    console.log('subids', subjectidlist)
    console.log('order', suborders)
    suborders = suborders.toString(); // "apple,banana,cherry"
    subjectidlist = subjectidlist.toString(); // "apple,banana,cherry"

    var sendobj = {
      "tagname": [this.CreateQuestion.value.tagname],
      "subject_id": subjectidlist,
      "suborder": subjectidlist,
      "question_type_id": false //false
    }
    console.log(sendobj)
    this._tagmasterservice.tagquestions(sendobj).subscribe(data => {
      if (data.msg == "Success") {
        console.log(data)
        this.selectedpaperques = data.Questions;
        console.log(this.selectedpaperques)
        for (var q = 0; q < this.selectedpaperques.length; q++) {
          this.selectedpaperques[q].question_master_desc_new = this.selectedpaperques[q].question_master_desc.replace(/uploads/g, imagepath);
          this.selectedpaperques[q].question_master_hint_new = this.selectedpaperques[q].question_master_hint.replace(/uploads/g, imagepath);
          for (var a = 0; a < this.selectedpaperques[q].ans.length; a++) {
            this.selectedpaperques[q].ans[a].answer_master_desc_new = this.selectedpaperques[q].ans[a].answer_master_desc.replace(/uploads/g, imagepath);
            //data.Questions[q].ans[a].stringlength = (data.Questions[q].ans[a].answer_master_desc.length);				 
          }
          //data.Questions[q].Maxlen = Math.max(...data.Questions[q].ans.map((o: any) => o.stringlength))
        }
        
        //this.CreateQuestion.value.qdata=data.Questions;
        //this.selectedtagques = data.Questions;

      }
      console.log(this.selectedpaperques)
    })

  }
  savepaper() {
    // var setobj = {
    //   "user": 12,
    //   "tpl_name": this.CreateQuestion.value.title,
    //   "tplName": this.CreateQuestion.value.title,
    //   "tag_name": this.CreateQuestion.value.tagname,
    //   "tpl_desc": this.CreateQuestion.value.description,
    //   "prgm_id": this.programlist.filter((p: any) => p.program_master_name == this.CreateQuestion.value.program)[0].program_master_id,
    //   "slave_code": "AJCKKDMC",
    //   "prgmName": this.CreateQuestion.value.program,
    //   "schema": this.CreateQuestion.value.markdetails,
    //   "user_branch": "AJCKKDMC",
    //   "exam_date": this.CreateQuestion.value.date,
    //   "exam_duration": this.CreateQuestion.value.duration,
    //   "exam_maxmarks": this.CreateQuestion.value.marks,
    //   "status": "insert",
    //   "print_data": this.selectedpaperques,
    //   "paper_type":'Tag'
    // }
    // console.log(setobj)
    //return false;

    //  mongoobj={
    //   "papercode":$scope.qdata.paper_code,
    //   "question_paper":$scope.newdata,
    //   "schema":$scope.paper.schema,
    //   //"timelapse":$scope.paper.timelapse,
    //   "branch":"AJCKKDMC"
    // }


    // this._exampaperservice.insertexampaper(setobj).subscribe(insertdata => {
    //console.log(insertdata);
    //});
    
    for (var q = 0; q < this.selectedpaperques.length; q++) {
      delete this.selectedpaperques[q].question_master_desc_new
      delete this.selectedpaperques[q].question_master_hint_new
      for (var a = 0; a < this.selectedpaperques[q].ans.length; a++) {
        delete this.selectedpaperques[q].ans[a].answer_master_desc_new
      }

    }

    var prgid=this.programlist.filter((p: any) => p.program_master_name == this.CreateQuestion.value.program)[0].program_master_id;
    var mongoobj = {  
      "paper_title": this.CreateQuestion.value.title,
      "tagname": this.CreateQuestion.value.tagname,
      "paper_desc": this.CreateQuestion.value.description,
      "question_paper": this.selectedpaperques,
      "markdetails": this.schemadetails,  
      "schemaname":this.selectedschema.title,    
      "program_id": prgid,
      "program_name": this.CreateQuestion.value.program,
      "branch": "AJCKKDMC",
      "userinfo": [],
      "exam_date": this.CreateQuestion.value.date,
      "exam_duration": this.CreateQuestion.value.duration,
      "exam_maxmarks": this.CreateQuestion.value.marks,
      "status": "insert",
    }
    console.log(mongoobj);
    this._exampaperservice.InsertExampapeMmongo(mongoobj).subscribe(insertmngdata => {
      console.log(insertmngdata)



      location.reload();


    });

  }

  EditData(pcode: any) {
    console.log(pcode)
  }
  showfromdiv(type: boolean) {
    if (type == true) {
      this.listdiv = false;
      this.formdiv = true;

      this.getprograms();
      this.getalltags();
    } else {
      this.listdiv = true;
      this.formdiv = false;
    }
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
    //console.log(obj);
    var total = 0;
    for (var i in obj)
      total += Number(obj[i][field]);
    return total;
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
}
