import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
logchangeddata: any;
institutecheck:number
constructor(){

     this.logchangeddata = sessionStorage.getItem('logindata');
     this.logchangeddata = JSON.parse(this.logchangeddata);
     var institutecheck = this.logchangeddata.institute_info.filter((e: { id: number; })=>e.id==3)
     //console.log(institutecheck.length)
     this.institutecheck = institutecheck.length

}

  
}
