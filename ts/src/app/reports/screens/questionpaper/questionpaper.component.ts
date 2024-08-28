import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PapersService } from '../../../core/services/papers.service';
import { ExampapersService } from '../../../core/services/exampapers.service';
import { imagepath,headerimage } from '../../../../environments/environment';
imagepath
@Component({
  selector: 'app-questionpaper',
  templateUrl: './questionpaper.component.html',
  styleUrls: ['./questionpaper.component.css']
})
export class QuestionpaperComponent {
  selectpapercode: any;
  qpaper: any;
  maindata:any;
  settime: string = '';
  schemaInfo: any[]; types: any; maxMrks: any; totalqcount: any;
  setheaderimage:any;
  constructor(private _papersService: PapersService, private route: ActivatedRoute, private router: Router,private _exampaperservice:ExampapersService) {
    this.selectpapercode = route.snapshot.params['papercode'];

    this.setheaderimage=headerimage;
    // this._papersService.paperinfo(this.selectpapercode).subscribe(pprinfodata => {
    //   // console.log(pprinfodata);
    //   this.maindata=pprinfodata[0];
    // });
    this._papersService.getpaper(this.selectpapercode).subscribe(paperdata => {
      this.maindata=paperdata;
      this.qpaper = paperdata[0].question_paper;
      console.log(this.qpaper)
      for (var q = 0; q < this.qpaper.length; q++) {
        this.qpaper[q].question_master_desc = this.qpaper[q].question_master_desc.replace(/uploads/g, imagepath);
        for (var a = 0; a < this.qpaper[q].ans.length; a++) {

          

          this.qpaper[q].ans[a].answer_master_desc = this.qpaper[q].ans[a].answer_master_desc.replace(/uploads/g, imagepath);		
          this.qpaper[q].ans[a].stringlength = (this.qpaper[q].ans[a].answer_master_desc.length);				 
        }
        this.qpaper[q].Maxlen = Math.max(...this.qpaper[q].ans.map((o: any) => o.stringlength))
      }
       console.log(this.qpaper)

      this.schemaInfo = paperdata[0].markdetails;
     console.log(this.schemaInfo);
      
      this._exampaperservice.questiontypes().subscribe(qtypdata => {
       
        if(qtypdata.msg=='Success'){
          console.log(qtypdata)
          this.types=qtypdata.questiontpyes;
         
       
        console.log(this.types)
      
      //// console.log(data);
      // this.types = [{ "question_type_id": "1", "question_type_name": "Single Answer", "type_code": "SA" }, { "question_type_id": "2", "question_type_name": "Multiple Answer", "type_code": "MA" }, { "question_type_id": "3", "question_type_name": "Matching", "type_code": "MM" }, { "question_type_id": "4", "question_type_name": "Numeric", "type_code": "IN" }, { "question_type_id": "5", "question_type_name": "Statement", "type_code": "ST" }, { "question_type_id": "6", "question_type_name": "Comprehension", "type_code": "CP" }, { "question_type_id": "7", "question_type_name": "Assertions and Reasons", "type_code": "AR" }, { "question_type_id": "8", "question_type_name": "Very short answer question (VSAQ)", "type_code": "VSAQ" }, { "question_type_id": "9", "question_type_name": "Short answer question (SAQ)", "type_code": "SAQ" }, { "question_type_id": "10", "question_type_name": "Long answer question (LAQ)", "type_code": "LAQ" }, { "question_type_id": "11", "question_type_name": "Comprehension Multiple", "type_code": "CPM" }, { "question_type_id": "12", "question_type_name": "Numeric2020", "type_code": "NMT" }, { "question_type_id": "13", "question_type_name": "NEET CHOICE QUESTIONS", "type_code": "NQ" }]
      
      for (var s = 0; s < this.schemaInfo.length; s++) {
        this.schemaInfo[s].typeName = this.types.filter((e: any) => e.type_code == this.schemaInfo[s].type)[0].question_type_name.toUpperCase();

        this.schemaInfo[s].qcount = this.qpaper.filter((a: any) => a.question_master_type == this.schemaInfo[s].qtype).length
        this.schemaInfo[s].max = this.qpaper.filter((a: any) => a.question_master_type == this.schemaInfo[s].qtype).length * this.schemaInfo[s].positive;
      }
      this.schemaInfo = this.schemaInfo.filter(e => e.qcount != 0);
       console.log(this.schemaInfo);
      this.maxMrks = 0;
      this.totalqcount = this.getSumElements(this.schemaInfo, 'qcount');
      this.maxMrks = this.getSumElements(this.schemaInfo, 'max');
    }
    });
  });
  }


  getSumElements(obj: any, field: any) {
    //// console.log(obj);
    var total = 0;
    for (var i in obj)
      total += Number(obj[i][field]);
    return total;
  }
  getsection(qty: any) {

    return this.schemaInfo.findIndex((e: any) => e.qtype == qty);
  }
  rromanize(num: number): string {
    const lookup: { [key: string]: number } = {
      M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
    };

    let roman = '';

    for (const key in lookup) {
      if (lookup.hasOwnProperty(key)) {
        while (num >= lookup[key]) {
          roman += key;
          num -= lookup[key];
        }
      }
    }

    return roman;
  }

  timeConvert(n: number): string {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);

    if (rhours <= 0) {
      this.settime = rminutes + ' Minutes';
    } else {
      const myh = rhours > 0 ? rhours + ' Hours ' : '';
      const mym = rminutes > 0 ? rminutes + ' Minutes' : '';
      this.settime = myh + mym;
    }

    return this.settime;
    // You might want to handle the return value differently depending on your use case
    // e.g., update a property in the component or display it in the template
  }
}
