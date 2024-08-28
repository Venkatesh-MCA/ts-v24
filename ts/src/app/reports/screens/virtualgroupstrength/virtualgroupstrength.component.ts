import { Component } from '@angular/core';
import { ScheduleService } from '../../../core/services/schedule.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-virtualgroupstrength',
  templateUrl: './virtualgroupstrength.component.html',
  styleUrls: ['./virtualgroupstrength.component.css']
})
export class VirtualgroupstrengthComponent {
  selectpapercode:any;
  schedules:any;
  vgrops:any;
  vglist:any;
  constructor(private _scheduleService:ScheduleService,private route: ActivatedRoute) {
   this.selectpapercode = route.snapshot.params['papercode'];
  this._scheduleService.ScheduleList(this.selectpapercode).subscribe(schdata => {
    console.log(schdata)
    this.schedules=schdata;
    this.vgrops=this.schedules.map((e:any)=>e.groups)
    console.log(this.vgrops)

    let concatenatedObject = this.vgrops.reduce((acc:any, curr:any) => {
      curr.forEach((item:any) => {
          acc[item.groupID] = item;
      });
      return acc;
  }, {});
  console.log(concatenatedObject);
  
  let arrayOfObjects = Object.values(concatenatedObject);

   


  var vgs=arrayOfObjects.map((s:any)=>s.groupID)

  //let arrayOfNumbers = vgs.map(str => str.replace(/^"(.*)"$/, '$1'));
   
  let arrayOfNumbers = vgs.map(str => Number(str));

  this._scheduleService.vifrtualgroupstrength(arrayOfNumbers).subscribe(vgdata => {
    console.log(vgdata)
      this.vglist=vgdata.result;
      var unvgids=this.getUniqeElements(vgdata.result,'vgroupid')
      console.log(unvgids)
  });
  
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
  //console.log(obj);
  var total = 0;
  for (var i in obj)
    total += Number(obj[i][field]);
  return total;
}
}
