import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinalresultService } from '../../../core/services/finalresult.service';
import { PapersService } from '../../../core/services/papers.service';
import * as XLSX from 'xlsx';
interface ExamData {
  suc: string;
  branch: string;
  section: string;
  program: string;
  studentname: string;
  examtype: string;
  attempteddate: number;
  TotalTime: number;
  rank: number;
  total: number;
  percentile: number;
  subjects: SubjectData[];

}

interface SubjectData {
  subjectname: string;
  resultr: number;
  resultw: number;
  resultl: number;

  studentRight: number;
  studentWrong: number;
  studentLeft: number;

  questionmarksr: number,
  questionmarksw: number,
  questionmarksl: number,

  timespentr: number,
  timespentw: number,
  timespentl: number,
  subjectime: number,
  marks: number, maxmarks: number; subjectrank: number;
}

@Component({
  selector: 'app-finalresult',
  templateUrl: './finalresult.component.html',
  styleUrls: ['./finalresult.component.css']
})
export class FinalresultComponent {
  selectpapercode: any;
  studenrresult: any;
  qpaper: any;
  //subjects:any=[];
  filtertext: any = '';
  searchText: string = '';
  convertedData: ExamData[] = [];
  unicbranch: any;
  selectedCampus: string = 'All';
  logchangeddata: any;
  sesinst: any;
  constructor(private _papersService: PapersService, private _finalResultService: FinalresultService, private route: ActivatedRoute) {
    this.selectpapercode = route.snapshot.params['papercode'];
    this.logchangeddata = sessionStorage.getItem('logindata');
    this.logchangeddata = JSON.parse(this.logchangeddata);
    // // console.log(this.logchangeddata.user_info[0].campus_name)
    this.sesinst = this.logchangeddata.user_info[0].institute_code
    //this.selectedCampus=this.logchangeddata.user_info[0].campus_name;
    //this.selectedCampus=this.selectedCampus.replace(/\s+/g, '')
    //this.filtertext=this.selectedCampus;
    this.sesinst = this.sesinst.toLowerCase();
    this.Result(this.sesinst, this.selectpapercode, this.selectedCampus)
  }



  Result(inst: any, papercode: any, campus: any) {
    // // console.log(campus)
    this.selectedCampus = campus;
    this._papersService.getpaper(this.selectpapercode).subscribe(paperdata => {
      this.qpaper = paperdata[0].question_paper;
      var subs = this.getUniqeElements(this.qpaper, 'subject_master_name');

      this._finalResultService.finalresult(inst, this.selectpapercode, campus).subscribe(finaresultdata => {
        // // console.log(finaresultdata)
        this.studenrresult = finaresultdata;
        this.convertedData = this.transformData(this.studenrresult, subs);
        //// console.log(this.convertedData)
        if (campus == 'All') {
          this.unicbranch = this.getUniqeElements(this.convertedData, 'branch')
        }

      });
    });
  }

  transformData(originalData: any[], subjects: any): ExamData[] {
    const convertedData: ExamData[] = [];

    for (const entry of originalData) {
      const convertedEntry: ExamData = {
        suc: entry.suc,
        branch: entry.branch,
        section: entry.section,
        program: entry.program,
        studentname: entry.studentname,
        examtype: entry.examtype,
        attempteddate: entry.attempteddate,
        total: entry.total,
        rank: entry.rank,
        percentile: Math.round(entry.percentile),
        TotalTime: 0,
        subjects: []
      };

      //const subjects = ["CHEMISTRY", "MATHEMATICS", "PHYSICS"];

      for (const subject of subjects) {
        const subjectEntry: SubjectData = {
          subjectname: subject,
          resultr: entry[`result${subject}r`],
          resultw: entry[`result${subject}w`],
          resultl: entry[`result${subject}l`],

          studentRight: entry[`studentmarks${subject}r`],
          studentWrong: entry[`studentmarks${subject}w`],
          studentLeft: entry[`studentmarks${subject}l`],

          questionmarksr: entry[`questionmarks${subject}r`],
          questionmarksw: entry[`questionmarks${subject}w`],
          questionmarksl: entry[`questionmarks${subject}l`],

          timespentr: entry[`timespent${subject}r`],
          timespentw: entry[`timespent${subject}w`],
          timespentl: entry[`timespent${subject}l`],
          //subjectime: entry[`timespent${subject}r`] + entry[`timespent${subject}w`] + entry[`timespent${subject}l`],
          subjectime: Math.round(((entry[`timespent${subject}r`] + entry[`timespent${subject}w`] + entry[`timespent${subject}l`] )/ 60) * 100)/100,

          marks: entry[`${subject}_marks`],
          maxmarks: entry[`${subject}_maxmarks`],
          subjectrank: entry[`${subject}_rank`],
        };
        
        convertedEntry.subjects.push(subjectEntry);
       
      }
      //// console.log( convertedEntry)
      convertedEntry.TotalTime=Math.round(this.getSumElements(convertedEntry.subjects,'subjectime'))
      convertedData.push(convertedEntry);
    }

    return convertedData;
  }


  exportexcel(selecpape: any): void {

    this.convertedData.forEach((item: any, index: any) => {
      item.subjects.forEach((element: any) => {
        item[element.subjectname + '_R'] = element.questionmarksr;
        item[element.subjectname + '_W'] = element.questionmarksw;
        item[element.subjectname + '_L'] = element.questionmarksl;

        item[element.subjectname + '_RM'] = element.studentRight;
        item[element.subjectname + '_WM'] = element.studentWrong;

        item[element.subjectname + '_Marks'] = element.marks;
        item[element.subjectname + '_Rank'] = element.subjectrank;
        item[element.subjectname + '_Time'] = (element.timespentr) +(element.timespentw)+(element.timespentl);

        //item.TotalTime=element.TotalTime;
      });
    });

    //remove unwanted columns
    let columnsToRemove = ['subjects'];

    this.convertedData = this.convertedData.map((item: any) => {
      let newItem = { ...item }; // Create a shallow copy of the original object

      // Remove specified columns
      columnsToRemove.forEach(column => {
        delete newItem[column];
      });

      return newItem;
    });

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Create a sheet for the main table
    const mainSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.convertedData);
    XLSX.utils.book_append_sheet(wb, mainSheet, 'MainTable');


    // Save the workbook to an Excel file
    XLSX.writeFile(wb, selecpape + '.xlsx');
    window.location.reload();


  }


  searchdatafilter(x: any) {
    // // console.log(x)
    if (x == '' || x == null || x == "null" || x == 'All') {
      this.filtertext = '';

      this.Result(this.sesinst, this.selectpapercode, 'All')
    } else {
      this.filtertext = x;
      //this.searchText = x;
      this.Result(this.sesinst, this.selectpapercode, this.filtertext)
    }



  }


  secondsToMinutesAndSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
  }
  secondsToHoursMinutesSeconds(seconds: number): string {
    //// console.log(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
    // Alternatively, if you want to include labels:
    // return `${hours} hours, ${minutes} minutes, and ${remainingSeconds} seconds`;
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
