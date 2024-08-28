import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public gmailinfo: any;
  public cmp_filter: any = [];
  public user_store_dt: any = [];
  public campusList = [];
  public instList = [];
  public userInfo = [];
  public permissionInfo = [];
  public yearInfo: [];
  public defaultcampus: any;
  public defaultinst: any;
  public logininfo: any;
  public instcampus: any;
  public instituecampuslist: any = [];
  public gmailPhoto: string;
  public yearsList = [];
  public defaultyear: any;
  public togglevalue: Number = 0;
  public logchangeddata: any;
  public baseurl: any;
  public instnmae: any;
  constructor(private _authenticationService: AuthenticationService, private router: Router) { // console.log('test') 
    
  }

  logout(): void {
    this._authenticationService.logout();
  }


  menuchange() {

    const box = document.getElementById('appbody');

    if (this.togglevalue == 0) {
      box?.classList.add('toggle-sidebar');
      this.togglevalue = 1;
    } else {
      box?.classList.remove('toggle-sidebar');
      this.togglevalue = 0;
    }

  }

  ngOnInit() {
    this.gmailinfo = sessionStorage.getItem('gmailinfo');
    this.gmailPhoto = JSON.parse(this.gmailinfo).photoUrl;
    this.logininfo = sessionStorage.getItem('logindata');
    // //// console.log(JSON.parse(this.logininfo))

    this.campusList = JSON.parse(this.logininfo).campus_info;
    this.instList = JSON.parse(this.logininfo).institute_info;
    this.userInfo = JSON.parse(this.logininfo).user_info;
    this.permissionInfo = JSON.parse(this.logininfo).permission_info;
    this.defaultyear = JSON.parse(this.logininfo).academic_year_info;

    this.defaultcampus = this.campusList.filter(e => e['id'] === this.userInfo[0]['campus_id']);
    this.defaultinst = this.instList.filter(e => e['id'] === this.userInfo[0]['inst_id']);


    for (var i = 0; i < this.instList.length; i++) {

      this.instcampus = this.campusList.filter(e => e['inst_id'] === this.instList[i]['id']);
      let preobj = {
        "instId": this.instList[i]['id'],
        "instituteName": this.instList[i]['short_code'],
        "campusList": this.instcampus
      }

      this.instituecampuslist.push(preobj)
    }


    // this._authenticationService.getAcademicyearlist().subscribe(data => {
    //     this.yearsList = data;
    //   });

  }

  changecampus(cinfo: any) {
    // console.log(cinfo)
    // this.defaultcampus = this.campusList.filter(e => e['id'] === cinfo['id']);
    // this.defaultinst = this.instList.filter(e => e['id'] === cinfo['inst_id']);

    this.logininfo = JSON.parse(this.logininfo);

    // this.logininfo.user_info[0].campus_id = cinfo['id']

    // this.logininfo.user_info[0].inst_id = cinfo['inst_id'];
    // this.cmp_filter = this.logininfo.campus_info.filter((e: { id: any; }) => e.id == this.logininfo.user_info[0].campus_id);
    // // console.log(this.cmp_filter);
    //// console.log(this.user_store_dt[0])
    // this.user_store_dt = sessionStorage.getItem('user_store_dt');
    // // console.log(JSON.parse(this.user_store_dt))
    // let temp_var = JSON.parse(this.user_store_dt);
    // // console.log(temp_var)
    var changed = this.logininfo.campus_info.filter((e: any) => e.id == cinfo.id)
    var changedinst = this.logininfo.institute_info.filter((g: any) => g.id == cinfo.inst_id)
    //temp_var[0].storeDetails[0].defaultCampus = this.cmp_filter[0].campus_shortcode;
    //sessionStorage.setItem('user_store_dt',JSON.stringify(temp_var[0]));
    this.logininfo.user_info[0].campus_id = changed[0].id;
    this.logininfo.user_info[0].campus_name = changed[0].campus_name;
    this.logininfo.user_info[0].inst_id = changed[0].inst_id;
    this.logininfo.user_info[0].institute_code = changedinst[0].short_code;
    this.logininfo.user_info[0].institute_name = changedinst[0].institute_name;

    sessionStorage.setItem('logindata', JSON.stringify(this.logininfo));
    this.logchangeddata = sessionStorage.getItem('logindata');
    this.logchangeddata = JSON.parse(this.logchangeddata);
    // console.log(this.logchangeddata)
    let pertype = this.logchangeddata.permission_info[0]['permission_type'].toLowerCase()
    // console.log(this.logchangeddata.user_info[0].inst_id)

    this.instnmae = this.logchangeddata.institute_info.filter((e: any) => e.id == this.logchangeddata.user_info[0].inst_id)[0].short_code;
    this.instnmae = this.instnmae.toLowerCase();
    // console.log(this.instnmae)
    //this.baseurl = (window.location.protocol + '//' + window.location.hostname + window.location.pathname)
    //this.baseurl= (window.location.protocol+'//'+window.location.hostname + window.location.pathname).split('/v23')[0]+"/v23";
    //this.baseurl = 'https://touchstone.aditya.ac.in/junior/v23/'
    this.baseurl = window.location.href;
    
    // console.log(this.baseurl)
    if (this.baseurl.includes('junior')) {
      // console.log('The URL contains the word "junior".');
      this.baseurl = this.baseurl.replace("junior", this.instnmae);
    } else if (this.baseurl.includes('degree')) {
      // console.log('The URL contains the word "degree".');
      this.baseurl = this.baseurl.replace("degree", this.instnmae);
    } else if (this.baseurl.includes('competitive')) {
      // console.log('The URL contains the word "competitive".');
      this.baseurl = this.baseurl.replace("competitive", this.instnmae);
    } else {
      // console.log('None of the specified words found in the URL.');
      //this.baseurl = this.baseurl.replace("", this.instnmae);
    }
    // console.log(this.baseurl)
    // console.log(pertype)
    if (pertype == 'management' || pertype == 'coordinator' || pertype == 'principal') {
      pertype = 'reports'
    } else {
      pertype = pertype;
    }
    
    //local line
    //this.baseurl=this.baseurl.split('/#')[0]+"/#/"+pertype;

    //server line
    this.baseurl=this.baseurl.split('/ts-admin')[0]+"/ts-admin/#/"+pertype;
    
    //this.router.navigate([this.baseurl]);
    window.location.href=this.baseurl;
    //location.reload();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    ////// console.log(JSON.stringify(sessionStorage.getItem('logindata')));

    //// console.log(this.baseurl);
  }

  changeyear(yinfo: any) {
    this.logininfo = JSON.parse(this.logininfo);
    this.logininfo.academic_year_info = this.yearsList.filter(e => e['year_id'] === yinfo['year_id']);

    sessionStorage.setItem('logindata', JSON.stringify(this.logininfo));
    location.reload();

  }


}