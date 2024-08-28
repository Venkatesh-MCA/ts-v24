import { Component } from '@angular/core';
import { QuestionanalysisService } from '../../../core/services/questionanalysis.service';
 
import { ActivatedRoute } from '@angular/router';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-questionanalysis',
  templateUrl: './questionanalysis.component.html',
  styleUrls: ['./questionanalysis.component.css']
})
export class QuestionanalysisComponent {
  selectpapercode:any;
  selectedsuccode:any;
  result:any;subtopics:any;
 
  constructor(private _questionanalysisService: QuestionanalysisService, private route: ActivatedRoute) {
    this.selectpapercode = route.snapshot.params['papercode'];
    this.selectedsuccode = route.snapshot.params['suc'];
    this._questionanalysisService.questionanalysis(this.selectpapercode,this.selectedsuccode).subscribe(qanalysisidata => {
      //// console.log(qanalysisidata)
      this.result = qanalysisidata;
      var obj = [];
        obj = this.result.map((e:any) => e.questionid);
        var setaddaa = {
          qArray: obj,
        };
        // console.log(setaddaa)
        
        this._questionanalysisService.getsubtopicnames(setaddaa).subscribe(subtpcdata => {
          // console.log(subtpcdata)
          this.subtopics=subtpcdata.subtopicsdata;
        });
    });
  }
  getsubtpcname(q: number, ind: number) {
    if(this.subtopics!=''){
    this.result[ind].subtopicname = this.subtopics.filter((s:any) => s.question_id == q)[0].subtopic_master_name;
    return this.result[ind].subtopicname;
    }
  }
  getimpression = function (imp:any) {

    if (imp < 34)
      return 'H';
    else if (imp < 66)
      return 'M';
    else
      return 'E';
  }
  millisToMinutesAndSeconds(millis: number): string {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(Number(seconds) < 10 ? '0' : '')}${seconds}`;
  }

   

 
}
