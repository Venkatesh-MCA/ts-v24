import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PapersService } from '../../../core/services/papers.service';
import { ExampapersService } from '../../../core/services/exampapers.service';
import { imagepath, headerimage } from '../../../../environments/environment';
@Component({
  selector: 'app-editexamppaper',
  templateUrl: './editexamppaper.component.html',
  styleUrls: ['./editexamppaper.component.css']
})
export class EditexamppaperComponent {
  qpaper: any;
  selectpapercode: any;
  FromtheQuestion: any;
  question_paper_details: any;
  schemdata: any;
  mngpaper: any;
  constructor(private _exampaperservice: ExampapersService, private _papersService: PapersService, private route: ActivatedRoute, private router: Router) {
    this.selectpapercode = route.snapshot.params['papercode'];
    this._papersService.getpaper(this.selectpapercode).subscribe(paperdata => {
      this.mngpaper = paperdata;
      this.schemdata = paperdata[0].markdetails;
      this.qpaper = paperdata[0].question_paper;
      console.log(this.qpaper)

      for (var q = 0; q < this.qpaper.length; q++) {
        this.qpaper[q].question_master_desc_new = this.qpaper[q].question_master_desc.replace(/uploads/g, imagepath);
        this.qpaper[q].question_master_hint_new = this.qpaper[q].question_master_hint.replace(/uploads/g, imagepath);
        for (var a = 0; a < this.qpaper[q].ans.length; a++) {
          this.qpaper[q].ans[a].answer_master_desc_new = this.qpaper[q].ans[a].answer_master_desc.replace(/uploads/g, imagepath);
        }

      }
    });
    // this._papersService.getpapermysqlquery(this.selectpapercode).subscribe(mysqldata => {
    //   this.question_paper_details = mysqldata;

    // });


  }

  ShuffleQue(inde: any) {
    console.log(inde)
    var qids = this.qpaper.map((e: any) => e.question_master_id);
    console.log(this.qpaper[inde])
    var shuffleobj = {
      "type": this.qpaper[inde].question_master_type,
      "program_id": this.qpaper[inde].program_id,
      "topic": this.qpaper[inde].topic_id,
      "level": this.qpaper[inde].question_master_level_id,
      "qid": this.qpaper[inde].question_master_id,
      "qidary": qids
    }
    console.log(shuffleobj);
    this._exampaperservice.shufflequestion(shuffleobj).subscribe(qbquestion => {
      console.log(qbquestion);

      this.FromtheQuestion = qbquestion.result;
      console.log(this.FromtheQuestion);

      this.FromtheQuestion.question_master_desc_new = this.FromtheQuestion.question_master_desc.replace(/uploads/g, imagepath);
      this.FromtheQuestion.question_master_hint_new = this.FromtheQuestion.question_master_hint.replace(/uploads/g, imagepath);
      for (var a = 0; a < this.FromtheQuestion.ans.length; a++) {
        this.FromtheQuestion.ans[a].answer_master_desc_new = this.FromtheQuestion.ans[a].answer_master_desc.replace(/uploads/g, imagepath);
      }


      this.qpaper[inde] = this.FromtheQuestion;
      console.log(this.qpaper[inde]);

    });

  }
  ChangeRelatedQue(inde: any) {
    console.log(inde)
    console.log(this.qpaper[inde])
    var pickobj = {
      "type": this.qpaper[inde].question_master_type,
      "program_id": this.qpaper[inde].program_id,
      "topic": this.qpaper[inde].topic_id,
      "level": this.qpaper[inde].question_master_level_id,
      "qid": this.qpaper[inde].question_master_id
    }
    this._exampaperservice.pickquestion(pickobj).subscribe(qbquestion => {
      console.log(qbquestion);

      this.FromtheQuestion = qbquestion.result;
      console.log(this.FromtheQuestion);

      this.FromtheQuestion.question_master_desc_new = this.FromtheQuestion.question_master_desc.replace(/uploads/g, imagepath);
      this.FromtheQuestion.question_master_hint_new = this.FromtheQuestion.question_master_hint.replace(/uploads/g, imagepath);
      for (var a = 0; a < this.FromtheQuestion.ans.length; a++) {
        this.FromtheQuestion.ans[a].answer_master_desc_new = this.FromtheQuestion.ans[a].answer_master_desc.replace(/uploads/g, imagepath);
      }

      this.qpaper[inde] = this.FromtheQuestion;
      console.log(this.qpaper[inde]);

    });


  }

  update_paper(opt_tpye: any) {
    if (opt_tpye == 'lock') {
      this._exampaperservice.lock_paper(this.selectpapercode, true).subscribe(lockpaperdata => {
        console.log(lockpaperdata)
        this.router.navigate(['/exampapers']);

      });
    } else {



      var sendobj = {
        "print_data": this.qpaper,
        "status": "update",
        "user": 11,
        "papercode": this.selectpapercode
      }
      console.log(this.qpaper)
      //return false
      // this._exampaperservice.updatepaper(sendobj).subscribe(updateddata => {
      //   console.log(updateddata);
      // });

      for (var q = 0; q < this.qpaper.length; q++) {
        delete this.qpaper[q].question_master_desc_new
        delete this.qpaper[q].question_master_hint_new
        for (var a = 0; a < this.qpaper[q].ans.length; a++) {
          delete this.qpaper[q].ans[a].answer_master_desc_new
        }

      }

      var mongoobj = {
        //"papercode":this.selectpapercode,
        "question_paper": this.qpaper,
        "userinfo": this.mngpaper[0].userinfo,
        "branch": "AJCKKDMC",
        "status":"updated"
      }

      console.log(this.mngpaper)
      //return false;
      this._exampaperservice.updatpaper_mngo(mongoobj, this.mngpaper[0]._id).subscribe(insertmngdata => {
        console.log(insertmngdata)


        this.router.navigate(['/exampapers']);

      });


    }
  }




}
