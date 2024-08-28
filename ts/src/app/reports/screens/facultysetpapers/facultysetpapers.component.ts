import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { imagepath, headerimage } from '../../../../environments/environment';
import { FacultypapersService } from '../../../core/services/facultypapers.service';
@Component({
  selector: 'app-facultysetpapers',
  templateUrl: './facultysetpapers.component.html',
  styleUrls: ['./facultysetpapers.component.css']
})

export class FacultysetpapersComponent {
  
  subjectlist: any;
  qtypelist: any;
  topics: any;
  subtopics: any;
  qlevels:any;
  nsg:boolean=false;

  subject: any;
  topic: any;
  subtopic: any;
  qtype: any='';
  qlevel:any='';

  questions: any;
  selectedques: any = [];

  selectquediv:boolean=false;
  logchangeddata:any;
  selectedCampus:any;

  qtypeObj:any;topicObj:any;subjectObj:any;
  formateddata:any;
  sendobj:any;
  templatename:any;
  isModalOpen:true;
  allData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 500;

  campusname: string = 'All'; 
  start: number = 0;
  end: number = 10;
  ind: number = 0;


  constructor(private _facultypaperservice: FacultypapersService, private fb: FormBuilder,private route: ActivatedRoute, private router: Router) {

    this.logchangeddata = sessionStorage.getItem('logindata');
    this.logchangeddata = JSON.parse(this.logchangeddata);
    console.log(this.logchangeddata)
    this.selectedCampus=this.logchangeddata.user_info[0].campus_name;
    this.selectedCampus=this.selectedCampus.replace(/\s+/g, '');


    this.subject=1;
    this.getallsubject();
    this.gettopics(this.subject)
    this.getalltypes();
    this.getlevels();

    
  }
  getallsubject() {
    
    this._facultypaperservice.getsubjects().subscribe(data => {
      console.log(data)
      this.subjectlist = data.Subjects
    });
  }
  getlevels() {
    
    this._facultypaperservice.getlelvels().subscribe(data => {
      console.log(data)
      this.qlevels = data.Levels
    });
  }
  
  gettopics(s: any) {
  this.topic=''
  this.subtopic=''
    if(Number.isInteger(s)){
      s=s;
    }else{
      s = s.target.value
    }
    console.log(s)
    this._facultypaperservice.gettopics(s).subscribe(data => {
      console.log(data)
      this.topics = data.Topics
    });
  }
  GetSubtopic(topicid: any) {
    this.subtopic=''
    this.qtype=''
    topicid = topicid.target.value
    console.log(topicid)
    var selectedtopicid = this.topics.filter((e: any) => e.topic_master_name == topicid)[0].topic_master_id;
    console.log(selectedtopicid)
    this._facultypaperservice.getsubtopics(selectedtopicid).subscribe(data => {
      console.log(data)
      this.subtopics = data.SubTopics
    });
  }
  getalltypes() {
    
    this._facultypaperservice.gettypes().subscribe(data => {
      console.log(data)
      this.qtypelist = data.questiontpyes;
    });
  }


  ShowQuestions(itemsPerPage:any, currentPage:any) {
    this.questions = '';
    var selectedtopicid = this.topics.filter((a: any) => a.topic_master_name == this.topic)[0].topic_master_id;
    console.log(this.subtopic)
    var selectedsubtopicid = this.subtopics.filter((a: any) => a.subtopic_master_name == this.subtopic)[0].subtopic_master_id;
    console.log(this.subject, selectedtopicid, selectedsubtopicid, this.qtype)
    var sendobj = {
      subjectid: this.subject,
      topicid: selectedtopicid,
      subtopic: selectedsubtopicid,
      type: this.qtype,
      level:this.qlevel,
      page: currentPage,
      limitto:itemsPerPage
    }
    console.log(sendobj)
    this._facultypaperservice.getquestions(sendobj).subscribe(qdata => {
      console.log(qdata)
      this.questions = qdata.data;
      if(this.questions==0){
        this.nsg=true;
      }else{
        this.nsg=false;
    
      console.log(this.selectedques);
      if (this.selectedques.length > 0) {
        for (var t = 0; t < this.questions.length; t++) {
          if(this.selectedques.filter((e: any) => e.question_master_id == this.questions[t].question_master_id).length>0){
            this.questions[t].selected=true;
          }else{
           
          }
          //this.questions[t].selected = this.selectedques.filter((e: any) => e.question_master_id == this.questions[t].question_master_id)[0].selected;
        }
      }
    }
    });

  }
  selectquestion(inde: any) {
    this.questions[inde].selected = !this.questions[inde].selected
    console.log(this.questions[inde].selected)
    if (this.questions[inde].selected == true) {
      this.selectedques.push(this.questions[inde])
    } else {
      this.selectedques.pop(this.questions[inde])
    }
    console.log(this.selectedques);
    this.formateddata=this.selectedqueformat(this.selectedques);
    console.log(this.formateddata);
    
  }
  showhidediv(){
    this.selectquediv = !this.selectquediv
     
  }
  removequestions(qid:any,perpage:any,currentPage:any){
    if (confirm("Are you sure you want to remove question ?")) {
       
      this.selectedques=this.selectedques.filter((e:any) => e.question_master_id !== qid);
      this.ShowQuestions(perpage,currentPage)
  } else {
      // User clicked "No" (Cancel)
     // console.log("User canceled.");
     //return false;
  }
    
  }
  selectedqueformat(selQues:any){
    var questions = []; var finalobj = []; var setfinal=[]; var NoofQues=0; var outputArray=[];
        questions = selQues;
        var unisubs = this.getUniqeElements(questions, 'subject_master_name')
        var setobj = [];
        for (var s = 0; s < unisubs.length; s++) {
            var subjedata = questions.filter((e:any) => e.subject_master_name == unisubs[s])
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
                        "Easy": questions.filter((z:any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Easy').length,
                        "Average": questions.filter((z:any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Average').length,
                        "Diff": questions.filter((z:any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Difficulty').length,
                        "VeryDiff": questions.filter((z:any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Very Difficulty').length,

                        "TotalQues": (questions.filter((z:any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Easy').length)+
                                    (questions.filter((z:any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Average').length)+
                                    (questions.filter((z:any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Difficulty').length)+
                                    (questions.filter((z:any) => z.subject_master_name == unisubs[s] && z.topic_master_name == topicsdata[t] && z.question_type_name == qtypesdata[y] && z.question_level_name == 'Very Difficulty').length)
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
  savequestions(){
    console.log(this.selectedques)
    this.sendobj={
      empid:this.logchangeddata.user_info[0].user_id,
      empname:this.logchangeddata.user_info[0].user_name,
      branch:this.selectedCampus,
      templatename:this.templatename='Paper Title',      
      userinfo:this.logchangeddata.user_info[0],
      questions:this.selectedques
      
    }
    this._facultypaperservice.createpaper(this.sendobj).subscribe(createdata => {
      console.log(createdata);
      
      this.router.navigate(['/facultypapers']);
    });
    
  }
  changediv(stat:any){
    if(stat==true){
      this.selectquediv=stat;
    }else{
      this.selectquediv=false;
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
    // // console.log(this.currentPage);
    this.ShowQuestions(this.itemsPerPage, this.currentPage)
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

    getUniqeElements(obj:any, field:any) {
    var elements = [];
    for (var i in obj) {
        if (elements.indexOf(obj[i][field]) == -1) {
            elements.push(obj[i][field]);
        }
    }
    return elements;
}
  getSumElements(obj:any, field:any) {
    //console.log(obj);
    var total = 0;
    for (var i in obj)
        total += Number(obj[i][field]);
    return total;
}
}