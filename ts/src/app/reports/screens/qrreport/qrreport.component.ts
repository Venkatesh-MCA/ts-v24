import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { animate } from '@angular/animations';
@Component({
  selector: 'app-qrreport',
  templateUrl: './qrreport.component.html',
  styleUrls: ['./qrreport.component.css']
})
export class QrreportComponent {
  selectpapercode: any;
  qrResult: any;

  subjects: any;
  Finaldata: any = [];
  branchnames: any;
  SETOBJ: any = [];
  obj: any = [];
  numval:any;
  constructor(private _authenticationService: AuthenticationService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.selectpapercode = route.snapshot.params['papercode'];
    this._authenticationService.qrresult(this.selectpapercode).subscribe(qrdata => {
      // console.log(qrdata)
      var obj = [];
      if (qrdata.Status == 200) {
        this.qrResult = qrdata.Data;
        this.subjects = this.getUniqeElements(this.qrResult, 'subject');
        this.branchnames = this.getUniqeElements(this.qrResult, 'branch');
        // console.log(this.qrResult);
        this.subjects.forEach((s: any) => {
          this.Finaldata = {
            SUBJECTNAME: s,
            BRANCHDATA: [],
          };
          this.branchnames.forEach((b: any) => {
            this.obj[b] = {
              BRANCHNAME: b,
              DATA: this.qrResult.filter((e: any) => e.branch === b && e.subject === s),
            };
            this.Finaldata.BRANCHDATA.push(this.obj[b]);
          });

          this.SETOBJ.push(this.Finaldata);

        });
        // console.log(this.SETOBJ);
      }


    });
  }

  //undeifned_data(marktype: string, sub: string, qid: string, branch: string): any {
    undeifned_data(perc:number): any {
    //const res = this.qrResult.filter((a: any) => a.branch === branch && a.questionid === qid && a.subject === sub);
    //// console.log(perc);

    // if (res.length > 0) {
    //   var num = 0, cnt;
    //   if (marktype === 'r') {
    //     num = res[0].r / (res[0].r + res[0].w + res[0].l);
    //     cnt = res[0].r;
    //   } else if (marktype === 'w') {
    //     num = res[0].w / (res[0].r + res[0].w + res[0].l);
    //     cnt = res[0].w;
    //   } else if (marktype === 'l') {
    //     num = res[0].l / (res[0].r + res[0].w + res[0].l);
    //     cnt = res[0].l;
    //   }
  if (perc > 0) {
         // this.numval = ((perc) * 100).toFixed(2);
          //// console.log(this.numval);
      let classname: string;

      if (perc < 34) {
        classname = 'red';
      } else if (perc < 66) {
        classname = 'blue';
      } else {
        classname = 'green';
      }

      return { CLAS: classname};
    } else {
      return { CLAS: 'red' };
    }
  }
  wrong_data(perc:number): any {
  if (perc > 0) {
         
      let classname: string;

      if (perc < 34) {
        classname = 'green';
      } else if (perc < 66) {
        classname = 'blue';
      } else {
        classname = 'red';
      }

      return { CLAS: classname};
    } else {
      return { CLAS: 'red' };
    }
  }
  left_data(perc:number): any {
    if (perc > 0) {
           
        let classname: string;
  
        if (perc < 34) {
          classname = 'green';
        } else if (perc < 66) {
          classname = 'blue';
        } else {
          classname = 'red';
        }
  
        return { CLAS: classname};
      } else {
        return { CLAS: 'red' };
      }
    }
  countstrngrh(subject:any,branch:any){
    var res=this.qrResult.filter((a:any)=>a.branch==branch);
    //// console.log(res[0]);
     return res[0];
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
