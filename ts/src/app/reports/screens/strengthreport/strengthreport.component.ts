import { Component } from '@angular/core';
import { AttendanceService } from '../../../core/services/attendance.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';

import { animate } from '@angular/animations';
@Component({
  selector: 'app-strengthreport',
  templateUrl: './strengthreport.component.html',
  styleUrls: ['./strengthreport.component.css']
})
export class StrengthreportComponent {
  loadingbtn: boolean = false;
  selectpapercode: any;
  msg: any;
  students: any;
  strengthObj: any = [];
  Total_strength: any;
  Total_present: any;
  Total_absents: any;
  stdArray: any;
  newArray: any = [];
  absentslist: any;
  absentsdiv: boolean = false;
  searchText: string = '';
  filtertext: any;
  datainfo: any;
  strengthsdata: any;
  strengthsdiv: boolean = false;
  all: string = 'Absents';
  ts: string = 'TotalStrength';
  submittedstr: string = 'TotalAttempted'
  generatebtn: boolean = false; regeneratebtn: boolean = false; title:string;
  constructor(private _attendanceService: AttendanceService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.selectpapercode = route.snapshot.params['papercode'];
    // console.log(this.selectpapercode);

    this._attendanceService.strengthResult(this.selectpapercode).subscribe(strdata => {
      // console.log(strdata)
      const stdRec = strdata.result;
      //strdata.result[0].students.length==0 
      if (strdata.result.length == 0 || strdata.result[0].students.length == 0) {
        this.msg = 'For strength and Absents report, click on the top right side icon...!';
        // console.log('default exam attend strengths')
        this.strengths(this.selectpapercode)
        this.generatebtn = true;
      } else {
        this.msg = '';
        this.view_ttendance(stdRec);
        this.regeneratebtn = true;
      }




    });

  }

  generatereport() {
    this.loadingbtn = true;
    this.regeneratebtn = false;
    this._attendanceService.attendancegroupcodes(this.selectpapercode).subscribe(rdata => {
      var data = rdata;
      // console.log(data);

      for (var g = 0; g < data.length; g++) {
        console.log(data[g].groupid)

        this._attendanceService.groupiddata(data[g].groupid).subscribe(sdata => {
          console.log(sdata)
          var stdrec = sdata.result;
          //// console.log(stdrec);
          //$scope.newVariable = '';

          var setobj = [];
          for (var s = 0; s < stdrec.length; s++) {
            this.newArray.push({
              "suc": stdrec[s].userCode,
              "group": parseInt(stdrec[s].vgroupid),
              "campus": stdrec[s].userInfo.campus_name,
              "course": stdrec[s].userInfo.course_name,
              "section": stdrec[s].userInfo.section_name,
              "studentname": stdrec[s].userInfo.student_name,
              "papecode": this.selectpapercode
            });
          }
        });
      }

      var finalobj = {
        "papecode": this.selectpapercode,
        "obj": this.newArray,
      };

      console.log(finalobj);
      setTimeout(() => {

        this._attendanceService.insertattendancedata(this.selectpapercode, finalobj).subscribe(insertdata => {
          // console.log(insertdata);
          if (insertdata.ok == 1) {


            window.location.reload();

          }
        });
        this.loadingbtn = false;
      }, 5000);


    })

  }

  view_ttendance = async (stdRec: any) => {
    this.students = stdRec[0].students;
    // console.log(this.students);

    var branches = this.getUniqeElements(this.students, 'campus');
    for (var b = 0; b < branches.length; b++) {
      this.strengthObj[b] = {
        stu_branch: branches[b],
        stu_strength: this.students.filter((e: any) => e.campus === branches[b]).length,
        attempts: this.students.filter((e: any) => e.campus === branches[b] && e.exam !== 0).length,
        absents: this.students.filter((e: any) => e.campus === branches[b] && e.exam === 0).length,
      };
    }
    this.Total_strength = this.getSumElements(this.strengthObj, 'stu_strength');
    this.Total_present = this.getSumElements(this.strengthObj, 'attempts');
    this.Total_absents = this.getSumElements(this.strengthObj, 'absents');
    this.strengthsdiv = false;
  }

  strengths(p: any) {
    this.strengthsdiv = true;
    this._attendanceService.strength([this.selectpapercode]).subscribe(strengths => {
      console.log(strengths)
      this.strengthsdata = strengths.result;
    });
  }
  showAbsentStudents(code: string, branch: string): void {
    console.log(branch)
    this.title=branch
    this.absentslist = '';
    if (branch == 'Absents') {
      
      this.absentslist = this.students.filter(
        (e: any) => e.papecode === code && e.exam === 0
      );
    } else {
      this.absentslist = this.students.filter(
        (e: any) => e.papecode === code && e.campus === branch && e.exam === 0
      );
    }

    this.selectpapercode = code;
    this.absentsdiv = true; // Set your desired value for showdiv
    // console.log(this.absentslist);
  }

  noofstudents(code: string, type: string) {
    console.log(type)
    this.title=type
    this.absentslist = this.students;
    if (type == 'TotalStrength') {
      this.absentslist = this.students.filter(
        (e: any) => e.papecode === code
      );
    } else if (type == 'TotalAttempted') {
      this.absentslist = this.students.filter(
        (e: any) => e.papecode === code && e.exam != 0
      );
    }
    else {
      this.absentslist = this.students.filter(
        (e: any) => e.papecode === code && e.campus === type
      );
    }
    this.absentsdiv = true; // Set your desired value for showdiv
    //this.students.filter((e: any) => e.campus === branches[b]).length,
  }
  branchsubmit(code: string, branch: string) {
    this.title=branch;
    this.absentslist = this.students;
    this.absentslist = this.students.filter(
      (e: any) => e.papecode === code && e.campus === branch && e.exam != 0
    );
    this.absentsdiv = true; // Set your desired value for showdiv
  }
  searchdatafilter(x: any) {
    this.filtertext = x;
    // //// console.log(this.filtertext);
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
}
