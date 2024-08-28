import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Virtual } from 'src/app/core/services/labvirtualgroup.service';
import { ExamresultService } from 'src/app/core/services/labexamresult.service';

import * as XLSX from 'xlsx';

interface VirtualGroup {
  virtual_group_name: string;
  vgroupId: number;
}

@Component({
  selector: 'app-schedule-report',
  templateUrl: './schedule-report.component.html',
  styleUrls: ['./schedule-report.component.css']
})
export class ScheduleReportComponent {



  @ViewChild('content') content: ElementRef;
  public VgrpData: any;
  public VId: any;
  public StudentData: any;
  public PaperCode: any;
  public ResultData: any;
  public FinalStdData: any = [];
  public notStartedCount: any;
  public continueCount: any;
  public completedCount: any;
  public scheduleName: any;
  public scheduleDetails: any = [];
  public campuswiseresult: any = [];
  public vg_result: any = [];
  public selected_result_Data: any = [];
  public view_table_result = 4;
  public campus_info: any = {};
  public finalCmpData: any = [];

  public PaperCodeData: any = [];
  public std_final_data: any = [];
  public selected_vg_id: any;


  constructor(private fb: FormBuilder, private virtualService: Virtual, private router: Router, private route: ActivatedRoute, private _examresultService: ExamresultService,) {
  }

  getExamStatusColor(examStatus: string): string {
    switch (examStatus) {
      case 'Not Started':
        return 'red';
      case 'Completed':
        return 'blue';
      case 'Continue':
        return 'green';
      default:
        return '';
    }
  }

  ngOnInit() {
    var papercode = this.route.snapshot.params['ppcode'];
    // // console.log(papercode)

    this.virtualService.GetResult(papercode).subscribe((data: any) => {
      // // console.log(data)
      this.PaperCodeData = data.result

      this._examresultService.getSchedule().subscribe((data2: any) => {
        // // console.log(data2)

        this.scheduleDetails = data2.result.filter((e: { papercode: any; }) => e.papercode == papercode)
        // // console.log(this.scheduleDetails)
        var vg_data: any = [];
        for (var i = 0; i < this.scheduleDetails.length; i++) {
          for (var j = 0; j < this.scheduleDetails[i].vgroupinfo.length; j++) {
            vg_data.push(this.scheduleDetails[i].vgroupinfo[j])
          }
        }
        // // console.log(vg_data)
        const resultArray: VirtualGroup[] = vg_data.map(({ virtual_group_name, vgroupId }: VirtualGroup) => ({ virtual_group_name, vgroupId }));
        // console.log(resultArray)

        // **************** For Unique Virtual Group Filtering *****************//
        let uniqueVgData: any = [];
        let tempObj: any = {};

        resultArray.forEach((obj: { virtual_group_name: string | number; }) => {
          if (!tempObj[obj.virtual_group_name]) {
            tempObj[obj.virtual_group_name] = true;
            uniqueVgData.push(obj);
          }
        });

        // console.log(uniqueVgData);
        this.vg_result = uniqueVgData


        this.virtualService.getStudentGrp(resultArray).subscribe((data3: any) => {
          // // console.log(data3);
          var VGData = data3.result;
          var stdobj = {}
          for (var i = 0; i < VGData.length; i++) {
            var filtered_vg = this.PaperCodeData.filter((e: { suc: any; }) => e.suc == VGData[i].userCode)
            // // console.log(filtered_vg)
            if (filtered_vg.length > 0) {
              stdobj = {
                "Campus": VGData[i]?.userInfo?.campus_name,
                "Course": VGData[i]?.userInfo?.course_name,
                "Section": VGData[i]?.userInfo?.section_name,
                "StdEmail": VGData[i]?.userInfo?.email,
                "StdName": VGData[i]?.userInfo?.student_name,
                "VGroupName": VGData[i]?.vgroupName,
                "VGroupId": VGData[i]?.vgroupid,
                "Suc": VGData[i].userCode,
                "QuestionCount": filtered_vg[0].questionCount,
                "ExamStatus": filtered_vg[0].examStatus,
                "TotalScore": filtered_vg[0].totalScore,
                "maxScore": filtered_vg[0].maxScore
              }
            }
            else {
              stdobj = {
                "Campus": VGData[i]?.userInfo?.campus_name,
                "Course": VGData[i]?.userInfo?.course_name,
                "Section": VGData[i]?.userInfo?.section_name,
                "StdEmail": VGData[i]?.userInfo?.email,
                "StdName": VGData[i]?.userInfo?.student_name,
                "VGroupName": VGData[i]?.vgroupName,
                "VGroupId": VGData[i]?.vgroupid,
                "Suc": VGData[i]?.userCode,
                "QuestionCount": "",
                "ExamStatus": 'Not Started',
                "TotalScore": "",
                "maxScore": ""
              }

            }
            this.std_final_data.push(stdobj)
          }
          // console.log(this.std_final_data)

          this.selected_result_Data = this.std_final_data
          this.FinalStdData = this.selected_result_Data
          this.notStartedCount = this.FinalStdData.filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Not Started').length
          this.continueCount = this.FinalStdData.filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Continue').length
          this.completedCount = this.FinalStdData.filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Completed').length

          this.campus_wise_data(this.FinalStdData)
          // // console.log(this.selected_result_Data)

          // *****For Virtual group wise Data******//
          for (var i = 0; i < this.vg_result.length; i++) {
            vg_data = this.FinalStdData.filter((e: { VGroupId: any; }) => e.VGroupId == this.vg_result[i].vgroupId)

            if (vg_data.length > 0) {
              var vg_completed = vg_data.filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Completed').length
              var vg_continue = vg_data.filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Continue').length
              var vg_notStarted = vg_data.filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Not Started').length
              this.vg_result[i].vg_strength = vg_data.length,
                this.vg_result[i].vg_completed = vg_completed
              this.vg_result[i].vg_continue = vg_continue
              this.vg_result[i].vg_notstarted = vg_notStarted
            }
          }
        })
      })
    })
  }

  campus_wise_data(selected_data: any) {
    // *****For Campus wise Data******//
    var uniquecampus = unique(selected_data, 'Campus');
    var campuswiseresult = []; var campusobj = {}; var campusarray: any = [];
    for (var i = 0; i < uniquecampus.length; i++) {

      campuswiseresult[i] = selected_data.filter((e: { Campus: any; }) => e.Campus == uniquecampus[i])
      var campusnotstarted = campuswiseresult[i].filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Not Started').length
      var campuscontinue = campuswiseresult[i].filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Continue').length
      var campuscompleted = campuswiseresult[i].filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Completed').length

      campusobj = {
        "campus": uniquecampus[i],
        "strength": campuswiseresult[i].length,
        "completed": campuscompleted,
        "continue": campuscontinue,
        "notstarted": campusnotstarted
      }
      campusarray.push(campusobj);
      campusarray.sort((a: { strength: number; }, b: { strength: number; }) => b.strength - a.strength);
      this.campuswiseresult = campusarray;
    }
    // // console.log(this.campuswiseresult)
    this.finalCmpData = []
    this.view_table_result = 0
  }

  view_vg_result(data: any) {
    var filtered_data = this.FinalStdData.filter((e: { VGroupId: any; }) => e.VGroupId == data.vgroupId)
    // // console.log(filtered_data)
    this.selected_vg_id = data.vgroupId
    this.campus_wise_data(filtered_data)
  }

  // gotoresult(std_data: any) {
  //   // // console.log(std_data)
  //   this.router.navigate(['/stdresview/', this.scheduleDetails[0]?.papercode, std_data.Suc]);
  // }

  // status_update(std_data: any) {
  //   // // console.log(std_data)
  //   if (confirm("Are you sure, Do you want to Continue..!")) {
  //     var res_obj = {
  //       "suc": std_data.Suc,
  //       "exam": this.scheduleDetails[0]?.papercode
  //     }
  //     // // console.log(res_obj)
  //     this.virtualService.update_Result_Status(res_obj).subscribe((data: any) => {
  //       // // console.log(data)
  //       location.reload()
  //     })
  //   }

  // }

  onCampusLoad(): void {
    this.campus_info = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [150],
      dom: 'Bfrtip',
      buttons: ['csv', 'excel', 'print']
    };
  }

  view_result(res_dt: any) {
    this.finalCmpData = []
    if (this.selected_vg_id == undefined) {
      this.finalCmpData = this.selected_result_Data.filter((e: { Campus: any; VGroupId: any; }) => e.Campus == res_dt)
    } else {
      this.finalCmpData = this.selected_result_Data.filter((e: { Campus: any; VGroupId: any; }) => e.Campus == res_dt && e.VGroupId == this.selected_vg_id)
    }
    // // console.log(this.finalCmpData)
    this.view_table_result = 1
    this.onCampusLoad()
  }

  exportToExcel_for_VG(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.vg_result);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'VirtualGroupWiseReport.xlsx');
  }

  exportToExcel_for_CAMPUS(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.campuswiseresult);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'CampusWiseReport.xlsx');
  }

  exportToExcel_for_CAMPUS_RES(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.finalCmpData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.finalCmpData[0].Campus + '_Report.xlsx');
  }

  exportToExcel_for_ALL(): void {
    this.campus_wise_data(this.selected_result_Data)
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.selected_result_Data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.scheduleDetails[0]?.paperinfo[0]?.papername + '_Report.xlsx');
  }
}

function unique(sbjnm: any, arg1: string): any {
  const uniqueValues = [...new Set(sbjnm.map((item: { [x: string]: any; }) => item[arg1]))];
  return uniqueValues;
}
