import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../../core/services/schedule.service';
@Component({
  selector: 'app-schedulelist',
  templateUrl: './schedulelist.component.html',
  styleUrls: ['./schedulelist.component.css']
})
export class SchedulelistComponent {
  searchform: FormGroup;
  selectedmngid: any;
  selectpapercode:any
  schedules:any;
  searchText: string = '';
  filtertext: any;
  
 
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private _scheduleService:ScheduleService) {
    this.searchform = this.fb.group({
      searchname: ['', [Validators.required]],
    });
    this.selectpapercode = route.snapshot.params['papercode'];
    // console.log(this.selectpapercode)

    //Exams List function
    this.showschedulelist(this.selectpapercode)
  }

  showschedulelist(papercode:any){
    this._scheduleService.ScheduleList(papercode).subscribe(scheduledata => {
      
      // console.log(scheduledata);
      this.schedules=scheduledata;
      
    });
  }


  //Search text function
  searchdatafilter(x: any) {
    this.filtertext = x;
  }

 
 
 
}
