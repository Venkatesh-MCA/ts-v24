import { Component } from '@angular/core';
import { PapersService } from '../../../core/services/papers.service'; 
import { ActivatedRoute } from '@angular/router';
import { imagepath } from '../../../../environments/environment';
@Component({
  selector: 'app-pptpaper',
  templateUrl: './pptpaper.component.html',
  styleUrls: ['./pptpaper.component.css']
})
export class PptpaperComponent {
  selectpapercode:any;
  selectedsubject:any;
  qpaper:any;
  qdata:any;
  constructor(private _papersService: PapersService, private route: ActivatedRoute) {
    this.selectpapercode = route.snapshot.params['papercode'];
    this.selectedsubject = route.snapshot.params['subject'];
    this._papersService.getpaper(this.selectpapercode).subscribe(paperdata => {
      this.qpaper = paperdata[0].question_paper;

      for (var q = 0; q < this.qpaper.length; q++) {
        this.qpaper[q].question_master_desc = this.qpaper[q].question_master_desc.replace(/uploads/g, imagepath);
        for (var a = 0; a < this.qpaper[q].ans.length; a++) {

          this.qpaper[q].ans[a].stringlength = (this.qpaper[q].ans[a].answer_master_desc.length);

          this.qpaper[q].ans[a].answer_master_desc = this.qpaper[q].ans[a].answer_master_desc.replace(/uploads/g, imagepath);						 
        }
        this.qpaper[q].Maxlen = Math.max(...this.qpaper[q].ans.map((o: any) => o.stringlength))
      }
      //// console.log(this.qpaper)
       var subjects = this.getUniqeElements(this.qpaper, 'subject_master_name');
      //// console.log( subjects);
       
      this.qdata = this.qpaper.filter((e:any) => e.subject_master_name == this.selectedsubject);
      // console.log(this.qdata)
    });
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
}
