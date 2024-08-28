import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamresultService } from 'src/app/core/services/labexamresult.service';
import { Virtual } from 'src/app/core/services/labvirtualgroup.service';

interface VirtualGroup {
  virtual_group_name: string;
  vgroupId: number;
}

@Component({
  selector: 'app-lab-schedule',
  templateUrl: './lab-schedule.component.html',
  styleUrls: ['./lab-schedule.component.css']
})
export class LabScheduleComponent {


  public schedule_list: any = []
  public virtual_group_data: any = []
  public total_schedule_list: any = []
  public selectedival = 0;
  public isCollapsed = false;
  public live_schedule_list: any = []
  public closed_schedule_list: any = []
  public show_live = 0;
  public VirtualGroupList: any = []
  public PaperWise_CmpData: any = []
  public Paperwise_cmpList: any = []
  public PaperWise_CmpData2: any = []
  public Paperwise_cmpList2: any = []
  public scheduleType = 1;
  public selected_vg_info: any = []

  constructor(private router: Router, private _examresultService: ExamresultService, private _virtualService: Virtual) { }

  ngOnInit() {
    this.ScheduleLoad(this.scheduleType)
  }

  closedList(type: any, show_type: any) {
    this.scheduleType = type;
    this.show_live = show_type;
    this.live_schedule_list = [];
    this.closed_schedule_list = [];
    this.ScheduleLoad(this.scheduleType)
  }

  ScheduleLoad(type: any) {

    this._virtualService.getVGCount().subscribe((data: any) => {
      // // console.log(data)
      this.virtual_group_data = data
    })

    this._examresultService.getSchedule().subscribe((data: any) => {
      // // console.log(data)

      var localStorageInfo: any = sessionStorage.getItem('logindata');
      localStorageInfo = JSON.parse(localStorageInfo)
      var cmp_info = unique(localStorageInfo.campus_info, 'campus_name')
      // // console.log(cmp_info)
      var obj = {
        "campus": cmp_info,
        "type": type
      }

      var schedule_list_total: any = []
      this._examresultService.getNewScheduleList(obj).subscribe(async (data1: any) => {
        // // console.log(data1)
        var filtered_ids = unique(data1.result, 'paperId')
        // // console.log(filtered_ids)
        for (var i = 0; i < filtered_ids.length; i++) {
          var paper_results = data.result.filter((e: { paperinfo: { _id: any; }[]; }) => e.paperinfo[0]._id == filtered_ids[i])
          if (paper_results.length > 0) {
            var obj: any = {}
            var cmp_name = data1.result.filter((e: { paperId: any; }) => e.paperId == filtered_ids[i])
            // // console.log(cmp_name)

            var unique_camp_list = unique(cmp_name, 'stdCampus')
            // // console.log(unique_camp_list)
            var vg_count = 0;
            for (var j = 0; j < paper_results.length; j++) {

              var score_count = 0;
              for (var k = 0; k < paper_results[j].paperinfo[0].questions.length; k++) {
                var filtred_cases = paper_results[j].paperinfo[0].questions[k].hidden_testcases
                for (var l = 0; l < filtred_cases.length; l++) {
                  score_count += filtred_cases[l].score * 1
                }
                // // console.log(score_count)
              }

              var filtered_paper_results = this.removeDuplicates(paper_results);
              // // console.log(filtered_paper_results)
              var resultArray: any = []

              for (var m = 0; m < filtered_paper_results.length; m++) {
                if (filtered_paper_results[m].vgroupinfo.length > 0) {
                  for (var k = 0; k < filtered_paper_results[m].paperinfo[0].questions.length; k++) {
                    var filtred_cases = filtered_paper_results[m].paperinfo[0].questions[k].hidden_testcases
                    for (var l = 0; l < filtred_cases.length; l++) {
                      score_count += filtred_cases[l].score * 1
                    }
                    // // console.log(score_count)
                  }

                  for (var n = 0; n < filtered_paper_results[m].vgroupinfo.length; n++) {
                    resultArray.push(filtered_paper_results[m].vgroupinfo[n])
                  }
                }
              }

              if (filtered_paper_results[j].vgroupinfo.length > 0) {
                for (var x = 0; x < paper_results[j].vgroupinfo.length; x++) {
                  var filtered_vg = this.virtual_group_data.result.filter((e: { vgroupid: any; }) => e.vgroupid == paper_results[j].vgroupinfo[x].vgroupId)
                  if (filtered_vg.length > 0) {
                    vg_count += filtered_vg[0].count * 1
                  }
                }
              }
              // // console.log(vg_count)
              obj = {
                "_id": paper_results[j]._id,
                "PaperCode": paper_results[j].papercode,
                "PaperInfo": paper_results[j].paperinfo,
                "vg_info": resultArray,
                "vg_count": vg_count,
                "Questions_count": paper_results[j].paperinfo[0].questions.length,
                "Score": score_count,
                "Campus": cmp_name[0].stdCampus,
                "Campus_info": unique_camp_list,
                "from_date": paper_results[j].from_date,
                "to_date": paper_results[j].to_date,
                "duration": paper_results[j].duration
              }
              // // console.log(obj)
            }
            schedule_list_total.push(obj)
          }
        }

        for (var i = 0; i < schedule_list_total.length; i++) {
          var list_count: any = await this.get_papercmp_onload(schedule_list_total[i])
          schedule_list_total[i].completed_count = list_count.total_completed
          schedule_list_total[i].continue_count = list_count.total_continue
          schedule_list_total[i].notstarted_count = list_count.total_notstarted
        }

        this.schedule_list = schedule_list_total.sort((a: { from_date: string | number | Date; to_date: string | number | Date; }, b: { from_date: string | number | Date; to_date: string | number | Date; }) => {
          return new Date(b.from_date).getTime() - new Date(a.from_date).getTime() ||
            new Date(b.to_date).getTime() - new Date(a.to_date).getTime();
        });

        // // console.log(this.schedule_list)
        if (this.scheduleType == 1) {
          var live_list = this.schedule_list.filter((item: any) => new Date(item.to_date) > new Date());
          this.live_schedule_list = live_list;
        }
        else {
          var closed_list = this.schedule_list.filter((item: any) => new Date(item.to_date) <= new Date());
          this.closed_schedule_list = closed_list
        }
        // console.log(live_list)
        // console.log(closed_list)
        this.total_schedule_list = this.schedule_list
      })
    })
  }

  async get_papercmp_onload(pp_dt: any) {
    return new Promise((resolve, reject) => {

      this.Paperwise_cmpList2 = []
      this.PaperWise_CmpData2 = []
      const vg_array: VirtualGroup[] = pp_dt.vg_info.map(({ virtual_group_name, vgroupId }: VirtualGroup) => ({ virtual_group_name, vgroupId }));
      this.VirtualGroupList = vg_array;

      // // console.log(pp_dt.PaperCode)
      this._virtualService.GetResult(pp_dt.PaperCode).subscribe((data: any) => {
        // // console.log(data)
        var current_paper_data = data.result
        this._virtualService.getStudentGrp(this.VirtualGroupList).subscribe((data3: any) => {
          // // console.log(data3);
          var VGData = data3.result;
          var stdobj = {}
          for (var i = 0; i < VGData.length; i++) {
            var filtered_vg = current_paper_data.filter((e: { suc: any; }) => e.suc == VGData[i].userCode)
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
            this.PaperWise_CmpData2.push(stdobj)
          }
          // *****For Campus wise Data******//
          var uniquecampus = unique(this.PaperWise_CmpData2, 'Campus');
          var campuswiseresult = []; var campusobj = {}; var campusarray: any = [];
          for (var i = 0; i < uniquecampus.length; i++) {

            campuswiseresult[i] = this.PaperWise_CmpData2.filter((e: { Campus: any; }) => e.Campus == uniquecampus[i])
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
            this.Paperwise_cmpList2 = campusarray;
          }

          // *****For Virtual group wise Data******//
          var vg_data: any = [];
          for (var i = 0; i < pp_dt.vg_info.length; i++) {
            vg_data = this.PaperWise_CmpData2.filter((e: { VGroupId: any; }) => e.VGroupId == pp_dt.vg_info[i].vgroupId)

            if (vg_data.length > 0) {
              var vg_completed = vg_data.filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Completed').length
              var vg_continue = vg_data.filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Continue').length
              var vg_notStarted = vg_data.filter((e: { ExamStatus: string; }) => e.ExamStatus == 'Not Started').length
              pp_dt.vg_info[i].vg_strength = vg_data.length,
                pp_dt.vg_info[i].vg_completed = vg_completed
              pp_dt.vg_info[i].vg_continue = vg_continue
              pp_dt.vg_info[i].vg_notstarted = vg_notStarted
            }
          }
          // console.log(this.Paperwise_cmpList2)
          var post_obj = {
            "total_completed": getSumElements(this.Paperwise_cmpList2, 'completed'),
            "total_continue": getSumElements(this.Paperwise_cmpList2, 'continue'),
            "total_notstarted": getSumElements(this.Paperwise_cmpList2, 'notstarted')
          }
          resolve(post_obj);
          return post_obj
        });
      })
    });
  }


  get_papercmp(pp_dt: any) {
    this.Paperwise_cmpList = []
    this.PaperWise_CmpData = []
    // console.log(pp_dt)
    const vg_array: VirtualGroup[] = pp_dt.vg_info.map(({ virtual_group_name, vgroupId }: VirtualGroup) => ({ virtual_group_name, vgroupId }));
    this.VirtualGroupList = vg_array;


    this._virtualService.GetResult(pp_dt.PaperCode).subscribe((data: any) => {
      // // console.log(data)
      var current_paper_data = data.result
      this._virtualService.getStudentGrp(this.VirtualGroupList).subscribe((data3: any) => {
        // // console.log(data3);
        var VGData = data3.result;
        var stdobj = {}
        for (var i = 0; i < VGData.length; i++) {
          var filtered_vg = current_paper_data.filter((e: { suc: any; }) => e.suc == VGData[i].userCode)
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
          this.PaperWise_CmpData.push(stdobj)
        }
        // *****For Campus wise Data******//
        var uniquecampus = unique(this.PaperWise_CmpData, 'Campus');
        var campuswiseresult = []; var campusobj = {}; var campusarray: any = [];
        for (var i = 0; i < uniquecampus.length; i++) {

          campuswiseresult[i] = this.PaperWise_CmpData.filter((e: { Campus: any; }) => e.Campus == uniquecampus[i])
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
          this.Paperwise_cmpList = campusarray;
        }

        // console.log(this.Paperwise_cmpList)
      });
    })
  }

  getschedulevgroup(ival: number) {
    // // console.log(ival);
    this.selectedival = ival;
  }

  goto_scheduleresult(data: any) {
    this.router.navigate(['/labschedulereport', data.PaperCode])

  }

  search_function(search_dt: any) {
    this.schedule_list = this.total_schedule_list.filter((e: any) => {
      // Search in paperinfo
      const paperinfo = e.PaperInfo[0];
      const paperFields = ["papercode", "papername", "paperdescription", "from_date", "duration"];
      const paperMatches = paperFields.some(field => {
        if (field === "from_date") {
          return e[field].includes(search_dt.target.value);
        }
        return paperinfo[field] && paperinfo[field].includes(search_dt.target.value);
      });

      return paperMatches;
    });
  }

  removeDuplicates(paper_results: any[]) {
    var filtered_vg = [];
    var processingIds: any = [];
    for (var i = 0; i < paper_results.length; i++) {
      var temp = { ...paper_results[i], vgroupinfo: [] }; // Create a copy of paper_results[i] with an empty vgroupinfo array
      for (var j = 0; j < paper_results[i].vgroupinfo.length; j++) {
        if (processingIds.includes(paper_results[i].vgroupinfo[j].vgroupId)) {
          continue; // Skip if vgroupId has already been processed
        }
        temp.vgroupinfo.push(paper_results[i].vgroupinfo[j]); // Add vgroupinfo to the temporary object
        processingIds.push(paper_results[i].vgroupinfo[j].vgroupId); // Add vgroupId to the processed list
      }
      filtered_vg.push(temp); // Push the temporary object to the filtered_vg array
    }
    return filtered_vg;
  }

  get_vg_info(dt: any) {
    this.selected_vg_info = dt.vg_info
  }

}

function unique(sbjnm: any, arg1: string): any {
  const uniqueValues = [...new Set(sbjnm.map((item: { [x: string]: any; }) => item[arg1]))];
  return uniqueValues;
}

function getSumElements(obj: { [x: string]: { [x: string]: any; }; }, field: string | number) {
  //// console.log(obj);
  var total = 0;
  for (var i in obj) {
    total += Number(obj[i][field]);
  }
  return total;
}