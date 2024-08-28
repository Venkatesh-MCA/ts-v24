import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PapersService } from '../../../core/services/papers.service';
import { ScheduleService } from '../../../core/services/schedule.service';
@Component({
  selector: 'app-scheduleupdate',
  templateUrl: './scheduleupdate.component.html',
  styleUrls: ['./scheduleupdate.component.css']
})
export class ScheduleupdateComponent {
  submitted = false;
  addscheduleform: FormGroup
  selectpapercode: any;
  loadingbtn: boolean = false;
  isDisabled: boolean = true; // Set this based on your condition
  virtualgroups: any;
  matchedGroups: any[] = [];
  groupData: any;
  selectedgroups: any;
  paper: any;
  useriinfo: any;
  userdata: any;

  updateform: boolean = false;
  mongoID: any;
  scheduleview: any;
  updatesheduleform: FormGroup;

  inst_id: any;
  selectedinst: any;
  constructor(private fb: FormBuilder, private _scheduleService: ScheduleService, private route: ActivatedRoute, private _papersService: PapersService,) {

    this.selectpapercode = route.snapshot.params['papercode'];
    this.mongoID = route.snapshot.params['mngid'];
    this.useriinfo = sessionStorage.getItem('logindata');
    this.userdata = JSON.parse(this.useriinfo);
    console.log(this.userdata.user_info[0])
    this.inst_id = this.userdata.user_info[0].inst_id;
     console.log(this.inst_id)
    //virtual groups data
    this.showvirtualgroups(this.inst_id);
    console.log(this.mongoID)
    if (this.mongoID != 'null' && this.mongoID != null && this.mongoID != undefined) {
       this.showscheduledata();
     // console.log('test')
    } 
    // else {
    //   this._papersService.getpaper(this.selectpapercode).subscribe(data => {
    //      console.log(data);
    //     this.paper = data[0];
    //   });  

    //   this.addscheduleform = this.fb.group({
    //     examtitle: ['', [Validators.required,]],
    //     papercode: [this.selectpapercode, [Validators.required]],
    //     examstartdate: ['', [Validators.required]],
    //     examstarttime: ['', [Validators.required]],
    //     examenddate: ['', [Validators.required]],
    //     examendtime: ['', [Validators.required]],
    //     duration: ['', [Validators.required]],
    //     randomquestions: [false, [Validators.required]],
    //     resultdisplay: [false],
    //     ipbasedexam: [false],
    //     selectedinst: [this.inst_id, [Validators.required]],
    //     groups: ['', [Validators.required]],
    //   })
    //  }


  }
  showvirtualgroups(inst: any) {


    if (inst && inst.target) {
      var selectedValue = inst.target.value;
    } else {
      var selectedValue = inst
    }
    this._papersService.virtualgrouplist(selectedValue).subscribe(vgdata => {
       console.log(vgdata);
      this.virtualgroups = vgdata.result;
    });

  }
  showscheduledata() {
    this.updateform = true;
    this._scheduleService.Scheduleview(this.selectpapercode, this.mongoID).subscribe(data => {
      console.log(data);
      this.scheduleview = data[0];

      
      var exmdtstart = this.fomratedate(this.scheduleview.examStartDateTime);
      var exmdtend = this.fomratedate(this.scheduleview.examEndDateTime)
      var starttime = this.formattime(this.scheduleview.examStartDateTime);
      var endtime = this.formattime(this.scheduleview.examEndDateTime);

      console.log(this.scheduleview.groups)
      var grids = this.scheduleview.groups.map((e: any) => e.groupId)
      
      console.log(grids)
      this.updatesheduleform = this.fb.group({
        papercode: [this.scheduleview.papercode, [Validators.required]],
        examtitle: [this.scheduleview.examName, [Validators.required]],
        examstartdate: [exmdtstart, [Validators.required]],
        examstarttime: [starttime, [Validators.required]],
        examenddate: [exmdtend, [Validators.required]],
        examendtime: [endtime, [Validators.required]],
        duration: [this.scheduleview.duration, [Validators.required]],
        randomquestions: [this.scheduleview.randomQue == '1' ? true : false, [Validators.required]],
        resultdisplay: [this.scheduleview.displayResult == '1' ? true : false],
        ipbasedexam: [this.scheduleview.ipbased],
        //selectedinst: [this.scheduleview.selectedinst, [Validators.required]],
        groups: [grids, [Validators.required]],
      })
    });
    
  }
  
  // get f(): { [key: string]: AbstractControl } {
  //   return this.addscheduleform.controls;
  // }
  get g(): { [key: string]: AbstractControl } {
    return this.updatesheduleform.controls;
  }
  onSubmit(formtype: boolean) {
    console.log(formtype)
    this.submitted = true;
    if (formtype == false) {
      if (this.addscheduleform.invalid) {
        return
      } else {
        // console.log(this.addscheduleform.value);
        this.senddata(formtype);
        //this.loadingbtn=true;
        this.submitted = true;
      }
    } else {
      if (this.updatesheduleform.invalid) {
        return
      } else {
        // console.log(this.updatesheduleform.value);
        this.senddata(formtype);
        this.submitted = true;
      }
    }

  }

  senddata(formtype: boolean) {
    if (formtype == false) {
      this.selectedMatchGroup(this.addscheduleform.value.groups, this.virtualgroups, (matchedGroups) => {
        this.matchedGroups = matchedGroups;
        // console.log(this.matchedGroups);
      });
    } else {
      console.log(this.updatesheduleform.value.groups)
      this.selectedMatchGroup(this.updatesheduleform.value.groups, this.virtualgroups, (matchedGroups) => {
        this.matchedGroups = matchedGroups;
          console.log(this.matchedGroups);
      });
    }
 
    var c1 = ''; var c2 = ''; var d1 = ''; var d2 = '';

    // c1 = this.addscheduleform.value.examstartdate + ' ' + this.addscheduleform.value.examstarttime + ':' + '00';
    // c2 = this.addscheduleform.value.examenddate + ' ' + this.addscheduleform.value.examendtime + ':' + '00';

    c1 = this.updatesheduleform.value.examstartdate + ' ' + this.updatesheduleform.value.examstarttime + ':' + '00';
    c2 = this.updatesheduleform.value.examenddate + ' ' + this.updatesheduleform.value.examendtime + ':' + '00';

    var cone = c1.split("/");

    //// console.log(c1);
    var cones = cone[1] + '-' + cone[0] + '-' + cone[2];

    var ctwo = c2.split("/");
    var ctwos = ctwo[1] + '-' + ctwo[0] + '-' + ctwo[2];

    var d1one = new Date(c1);
    var m = d1one.toISOString();

    var d2one = new Date(c2);
    var n = d2one.toISOString();
    //// console.log(d);
    // console.log(m, n);
 
    var onlinelistobj = {
      "examName": this.updatesheduleform.value.examtitle,
      "examStartDateTime": m,
      "examEndDateTime": n,
      "randomQue": (this.updatesheduleform.value.randomquestions == false) ? '0' : '1',
      "randomAns": '0',
      "repeatable": '0',
      "displayResult": (this.updatesheduleform.value.resultdisplay == false) ? '0' : '1',
      "ipbased": this.updatesheduleform.value.ipbasedexam,
      "duration": this.updatesheduleform.value.duration,
      "status": '1',
      "papercode": this.updatesheduleform.value.papercode,
      "ipAddress": "****",
      "userId": this.userdata.user_info[0].user_id,
      "schema": this.scheduleview.schema,
      "programId": this.scheduleview.programId,
      "programName": this.scheduleview.program_name,       
      "Branch": this.userdata.user_info[0].campus_name,
      "groups": this.matchedGroups
    };
     console.log(onlinelistobj);
     

  //    this._scheduleService.CreateSchedule(onlinelistobj).subscribe(inserdata => {
  //     console.log(inserdata);
     
  //  });
  }
  selectedMatchGroup(groups: any, groupname: any, callback: (matchedGroups: any[]) => void) {
    //const groups = ["22277", "22278"];
    //const groupname = [
    //   { "aasdas": "3434" },
    //   { "data": "22277" },
    //   { "data2": "22278" }
    // ];
    this.matchedGroups = groups.map((groupId: any) => {
      //const groupData = groupname.find((item:any) => Object.values(item).includes(groupId));
      const groupData = groupname.find((item: any) => item.vgroupId.toString() === groupId);

      // console.log(groupData)
      const groupName = groupData ? groupData.virtual_group_name : ''; // Get the first key or provide a default value
      //const groupDataValue = this.groupData ? this.groupData[groupName] : ''; // Get the value associated with the key or provide a default value

      return { groupId, groupName };
    });

    // console.log(this.matchedGroups);
  }

 
  fomratedate(dateTimeString: any) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = dateTime.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    //// console.log('Formatted Date:', formattedDate);
    return formattedDate;
  }

  formattime(dateTimeString: any) {
    const dateTime = new Date(dateTimeString);
    const timeFormatter = new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format
      timeZone: 'Asia/Kolkata' // Indian Standard Time (IST)
    });
    const formattedTime = timeFormatter.format(dateTime);
    return formattedTime;
  }
}


