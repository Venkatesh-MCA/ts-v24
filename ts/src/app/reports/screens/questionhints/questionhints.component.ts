import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PapersService } from '../../../core/services/papers.service';
import { imagepath,headerimage } from '../../../../environments/environment';
@Component({
  selector: 'app-questionhints',
  templateUrl: './questionhints.component.html',
  styleUrls: ['./questionhints.component.css']
})
export class QuestionhintsComponent {
  selectpapercode: any
  data: any;
  key: any=[];
  sub: any = []; top: any = [];
  sp: any; tp: any
  //obj: any = [];
  Newkey:any=[];
  maindata:any;
  settime: string = '';
  setheaderimage:any;
  constructor(private _papersService: PapersService, private route: ActivatedRoute, private router: Router) {
    this.selectpapercode = route.snapshot.params['papercode'];
    this.setheaderimage=headerimage;
    // this._papersService.paperinfo(this.selectpapercode).subscribe(pprinfodata => {
    //    console.log(pprinfodata);
    //   this.maindata=pprinfodata[0];
    // });
    this._papersService.getpaper(this.selectpapercode).subscribe(getdata => {
      this.maindata=getdata;
      this.data = getdata[0].question_paper;
      // console.log(this.data);
      for (var q = 0; q < this.data.length; q++) {
        //this.data[q].question_master_hint = this.data[q].question_master_hint.replace(/&quot;/g, '""');
        
        this.data[q].question_master_hint = this.data[q].question_master_hint.replace(/uploads/g, imagepath);
        for (var a = 0; a < this.data[q].ans.length; a++) {

          this.data[q].ans[a].stringlength = (this.data[q].ans[a].answer_master_desc.length);

          this.data[q].ans[a].answer_master_desc = this.data[q].ans[a].answer_master_desc.replace(/uploads/g, imagepath);						 
        }
        this.data[q].Maxlen = Math.max(...this.data[q].ans.map((o: any) => o.stringlength))
      }

      var unisubs = this.getUniqeElements(this.data, 'subject_master_name')
      // console.log(unisubs);


      this.data.forEach((d: any, k: any) => {
        //// console.log(d)
        // if (this.sp !== d.subject_master_name) {
        //   this.sp = d.subject_master_name;

        //this.sub[i] = this.sp;
        //this.top[i++] = d.topic_master_name;
        //}




        const ansCnt: number[] = [];
        const ansval: string[] = [];
        let ans: any[] = [];
        
      
        d.ans.forEach((a: any, kk: any) => {
           //// console.log(a)
          if (a.answer_master_isright == 1 && a.answer_master_desc != 'Single' && a.answer_master_desc != 'Range') {
            if (d.question_master_type == 4 || d.question_master_type == 12) {
              ans[0] = a.answer_master_desc;
              //// console.log(d.ans[0].answer_master_desc)
              ansval.push(d.ans[0].answer_master_desc);
             
            } else {
              ans[0] = kk + 1;
            }
           
            ansCnt.push(ans[0]);
          }
        });
        //// console.log(ansCnt)
        const ansOption = ansCnt.join();

        const obj = {
          qno: k + 1,
          ans: ansval[0] == 'Single' ? ansOption.split(',')[0] : ansOption,
          anstyp: ansval[0],
          ansval: ansval[0] == 'Single' ? ansOption.split(',')[0] : ansOption,
          sub_name: d.subject_master_name,
        };
        //// console.log(obj)
        this.key.push(obj);
          
      });
      // console.log(this.key);
      
      
      for(var b=0;b<unisubs.length;b++){
          this.Newkey[b]={
          "Subje":unisubs[b],
          "Keys":this.key.filter((e:any)=>e.sub_name==unisubs[b])
          };
        }
      
      // console.log(this.Newkey);
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
  getSumElements(obj: any, field: any) {
    //// console.log(obj);
    var total = 0;
    for (var i in obj)
      total += Number(obj[i][field]);
    return total;
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
