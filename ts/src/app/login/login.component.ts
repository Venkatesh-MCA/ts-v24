import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { AuthenticationService } from '../core/services/authentication.service';
import { markFormGroupTouched } from '../utilities/MarkFormGroupAsTouched';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:any;
  loggedIn:any;
  constructor(private authService: SocialAuthService,private _authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() { 
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      sessionStorage.setItem('gmailinfo',JSON.stringify(this.user));
      this._authenticationService.login(this.user.email).subscribe(userDetails => {
        // // console.log(userDetails);
        if(userDetails.campus_info.length>0){ 
          //this._authenticationService.user_store_details(userDetails.user_info[0].user_email).subscribe(data => { 
             //// console.log(userDetails.user_info);
           // sessionStorage.setItem('user_store_dt',JSON.stringify(userDetails.user_info));
          //});
          sessionStorage.setItem('logindata',JSON.stringify(userDetails));
          let pertype = userDetails.permission_info[0]['permission_type'].toLowerCase( )
          // // console.log(pertype)
          if(pertype=='management' || pertype=='coordinator' || pertype=='principal')
          {
            pertype='reports'
          }else{
            pertype=pertype;
          }
          //this.router.navigate(['/store']);
          this.router.navigate(['/'+pertype]);
        }else{}

      });
  })
}
  
loginguest(){
this.user={"idToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzNGE1ODE2NDY4Yjk1NzAzOTUzZDE0ZTlmMTVkZjVkMDlhNDAxZTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzcyNzc4Mzc0NzktZ2VocGU5a2oyYXA5anE0ZmZycTY4dDVoajkzcnJydDEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzcyNzc4Mzc0NzktZ2VocGU5a2oyYXA5anE0ZmZycTY4dDVoajkzcnJydDEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI5MTU0NzE5MjMzODE5ODY0OTciLCJoZCI6ImFkaXR5YS5hYy5pbiIsImVtYWlsIjoiam9AYWRpdHlhLmFjLmluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcxMTk0NDUxMSwibmFtZSI6Ikp1bmlyIE9wZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS1RNNV9Za0lWbVZxY2k3UHFEUGpHVWR1ZzVCTEpST2hNekk5ZnllcmNvPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ikp1bmlyIiwiZmFtaWx5X25hbWUiOiJPcGVyIiwiaWF0IjoxNzExOTQ0ODExLCJleHAiOjE3MTE5NDg0MTEsImp0aSI6IjdhYmY1NWY4MWNmYzdkMmE0YWVlNDY0MDJkMzQyMDA1YzAyNWRlYjAifQ.mleQtkAQM08Sk3dz6B7TCQ7BkGFXmF02QdeuhxJIFM6YthXIEzjl9YIw52E3xV04E71HGhD5lcfwdJm0IWDDgR7MSeY-N8F2BohI2EYagQ_qwZOawVO38tU6Lp9dZqpnUUehoZVNqhm63fugmekWMGFsRXQa6WKDhuSuRJ6w6DxXjSZEEjJumffJ1C0z9zokgmJNepOQZd14UblvTOWeJyxJqLuNfXA8c9JVTdZNX0p4koiuhctKnpum8ocfHUVDmCH9MjlH20u8ffQESQJuuCRoDd_bNAToP1HguS-3HYvHBq_FnVLLToZPz6-zerc_Y6E--2PKaa3OtJZP3qzYTQ","id":"112915471923381986497","name":"Junir Oper","email":"jo@aditya.ac.in","photoUrl":"https://lh3.googleusercontent.com/a/ACg8ocKTM5_YkIVmVqci7PqDPjGUdug5BLJROhMzI9fyerco=s96-c","firstName":"Junir","lastName":"Oper","provider":"GOOGLE"}
    
sessionStorage.setItem('gmailinfo',JSON.stringify(this.user));
var userinfo = {
"user_info": [
    {
        "user_id": 40,
        "user_name": "JO",
        "user_email": "jo@aditya.ac.in",
        "permission_id": 5,
        "alloted_campus_ids": "22,23,24,25,26,27,28,60,78,97,1,2,3,4,6,7,8,9,10,11,12,13,14,54,58,68,69,70,82,83,90,98,108,30,31,32,33,34,35,36,37,61,62,63,64,65,66,71,72,75,76,79,80,86,91,92,93,95,99,100,103,104,109,110,111,112,77,88,40,44,45,49,96,105,106,46,47,48,59,5,29,107",
        "alloted_inst_ids": "1,2,3,4,5,6,7,8,10",
        "campus_id": 1,
        "campus_name": "AJCKKDMC",
        "inst_id": 2,
        "institute_name": "JUNIOR COLLEGE",
        "institute_code": "JUNIOR"
    }
],
"institute_info": [
    {
        "id": 1,
        "institute_name": "SCHOOLS",
        "short_code": "SCHOOL"
    },
    {
        "id": 2,
        "institute_name": "JUNIOR COLLEGE",
        "short_code": "JUNIOR"
    },
    {
        "id": 3,
        "institute_name": "DEGREE COLLEGE",
        "short_code": "DEGREE"
    },
    {
        "id": 4,
        "institute_name": "COMPETITIVE",
        "short_code": "COMPETITIVE"
    },
    {
        "id": 5,
        "institute_name": "PG COLLEGE",
        "short_code": "PG"
    },
    {
        "id": 6,
        "institute_name": "NURSING",
        "short_code": "NURSING"
    },
    {
        "id": 7,
        "institute_name": "INTERNATIONAL SCHOOL",
        "short_code": "LAKSHYA"
    },
    {
        "id": 8,
        "institute_name": "IIT SCHOOL",
        "short_code": "IITSCHOOL"
    },
    {
        "id": 10,
        "institute_name": "THAKSH  CBSE SCHOOL",
        "short_code": "THAKSH"
    }
],
"campus_info": [
    {
        "id": 1,
        "campus_name": "AJCKKDMC",
        "campus_shortcode": "AJCKKDMC",
        "inst_id": 2
    },
    {
        "id": 2,
        "campus_name": "AJCKKDHC",
        "campus_shortcode": "AJCKKDHC",
        "inst_id": 2
    },
    {
        "id": 3,
        "campus_name": "AJCKKDGC",
        "campus_shortcode": "AJCKKDGC",
        "inst_id": 2
    },
    {
        "id": 4,
        "campus_name": "AIITJ",
        "campus_shortcode": "AIITJ",
        "inst_id": 2
    },
    {
        "id": 5,
        "campus_name": "AIITS",
        "campus_shortcode": "AIITS",
        "inst_id": 8
    },
    {
        "id": 6,
        "campus_name": "AJCAMP",
        "campus_shortcode": "AJCAMP",
        "inst_id": 2
    },
    {
        "id": 7,
        "campus_name": "AJCPKL",
        "campus_shortcode": "AJCPKL",
        "inst_id": 2
    },
    {
        "id": 8,
        "campus_name": "AJCBVM",
        "campus_shortcode": "AJCBVM",
        "inst_id": 2
    },
    {
        "id": 9,
        "campus_name": "AJCTPG",
        "campus_shortcode": "AJCTPG",
        "inst_id": 2
    },
    {
        "id": 10,
        "campus_name": "AJCMDP",
        "campus_shortcode": "AJCMDP",
        "inst_id": 2
    },
    {
        "id": 11,
        "campus_name": "AJCRJY",
        "campus_shortcode": "AJCRJY",
        "inst_id": 2
    },
    {
        "id": 12,
        "campus_name": "CBSE",
        "campus_shortcode": "CBSE",
        "inst_id": 2
    },
    {
        "id": 13,
        "campus_name": "ACAA",
        "campus_shortcode": "ACAA",
        "inst_id": 2
    },
    {
        "id": 14,
        "campus_name": "AJCNSP",
        "campus_shortcode": "AJCNSP",
        "inst_id": 2
    },
    {
        "id": 22,
        "campus_name": "APSSRI",
        "campus_shortcode": "APSSRI",
        "inst_id": 1
    },
    {
        "id": 23,
        "campus_name": "APSJKP",
        "campus_shortcode": "APSJKP",
        "inst_id": 1
    },
    {
        "id": 24,
        "campus_name": "APSAMP",
        "campus_shortcode": "APSAMP",
        "inst_id": 1
    },
    {
        "id": 25,
        "campus_name": "APSPKL",
        "campus_shortcode": "APSPKL",
        "inst_id": 1
    },
    {
        "id": 26,
        "campus_name": "APSNSP",
        "campus_shortcode": "APSNSP",
        "inst_id": 1
    },
    {
        "id": 27,
        "campus_name": "APSPTP",
        "campus_shortcode": "APSPTP",
        "inst_id": 1
    },
    {
        "id": 28,
        "campus_name": "APSGMD",
        "campus_shortcode": "APSGMD",
        "inst_id": 1
    },
    {
        "id": 29,
        "campus_name": "AIITSPKL",
        "campus_shortcode": "AIITSPKL",
        "inst_id": 8
    },
    {
        "id": 30,
        "campus_name": "ADC KKD",
        "campus_shortcode": "ADCKKD",
        "inst_id": 3
    },
    {
        "id": 31,
        "campus_name": "AWDC KKD",
        "campus_shortcode": "AWDCKKD",
        "inst_id": 3
    },
    {
        "id": 32,
        "campus_name": "ADC RJY",
        "campus_shortcode": "ADCRJY",
        "inst_id": 3
    },
    {
        "id": 33,
        "campus_name": "AWDC RJY",
        "campus_shortcode": "AWDCRJY",
        "inst_id": 3
    },
    {
        "id": 34,
        "campus_name": "ADC PKL",
        "campus_shortcode": "ADCPKL",
        "inst_id": 3
    },
    {
        "id": 35,
        "campus_name": "ADC ASL",
        "campus_shortcode": "ADCASL",
        "inst_id": 3
    },
    {
        "id": 36,
        "campus_name": "ADC GPT",
        "campus_shortcode": "ADCGPT",
        "inst_id": 3
    },
    {
        "id": 37,
        "campus_name": "ADC GWK",
        "campus_shortcode": "ADCGWK",
        "inst_id": 3
    },
    {
        "id": 40,
        "campus_name": "AIPGS",
        "campus_shortcode": "AIPGS",
        "inst_id": 5
    },
    {
        "id": 44,
        "campus_name": "ADPGMSC",
        "campus_shortcode": "ADPGMSC",
        "inst_id": 5
    },
    {
        "id": 45,
        "campus_name": "ADPGWMSC",
        "campus_shortcode": "ADPGWMSC",
        "inst_id": 5
    },
    {
        "id": 46,
        "campus_name": "ANC(NURSING)",
        "campus_shortcode": "ANC(NURSING)",
        "inst_id": 6
    },
    {
        "id": 47,
        "campus_name": "ASN(NURSING)",
        "campus_shortcode": "ASN(NURSING)",
        "inst_id": 6
    },
    {
        "id": 48,
        "campus_name": "FNSN(NURSING)",
        "campus_shortcode": "FNSN(NURSING)",
        "inst_id": 6
    },
    {
        "id": 49,
        "campus_name": "MSCGPT",
        "campus_shortcode": "MSCGPT",
        "inst_id": 5
    },
    {
        "id": 54,
        "campus_name": "AJCKKD-EAMCET",
        "campus_shortcode": "AJCKKD-EAMCET",
        "inst_id": 2
    },
    {
        "id": 58,
        "campus_name": "AJCNSP-EAMCET",
        "campus_shortcode": "AJCNSP-EAMCET",
        "inst_id": 2
    },
    {
        "id": 59,
        "campus_name": "LAKSHYA",
        "campus_shortcode": "LAKSHYA",
        "inst_id": 7
    },
    {
        "id": 60,
        "campus_name": "AIITSAMP-PRIMARY",
        "campus_shortcode": "AIITSAMP-PRIMARY",
        "inst_id": 1
    },
    {
        "id": 61,
        "campus_name": "ADC AMP",
        "campus_shortcode": "ADCAMP",
        "inst_id": 3
    },
    {
        "id": 62,
        "campus_name": "ADC TPG",
        "campus_shortcode": "ADCTPG",
        "inst_id": 3
    },
    {
        "id": 63,
        "campus_name": "ADC ELR",
        "campus_shortcode": "ADCELR",
        "inst_id": 3
    },
    {
        "id": 64,
        "campus_name": "ADC SKLM",
        "campus_shortcode": "ADCSKLM",
        "inst_id": 3
    },
    {
        "id": 65,
        "campus_name": "ADC BVM",
        "campus_shortcode": "ADCBVM",
        "inst_id": 3
    },
    {
        "id": 66,
        "campus_name": "AWDC SKLM",
        "campus_shortcode": "AWDCSKLM",
        "inst_id": 3
    },
    {
        "id": 68,
        "campus_name": "AJCAMP(EAMCET)",
        "campus_shortcode": "AJCAMP(EAMCET)",
        "inst_id": 2
    },
    {
        "id": 69,
        "campus_name": "AJCSKLM",
        "campus_shortcode": "AJCSKLM",
        "inst_id": 2
    },
    {
        "id": 70,
        "campus_name": "AJCELR",
        "campus_shortcode": "AJCELR",
        "inst_id": 2
    },
    {
        "id": 71,
        "campus_name": "ADC VZM",
        "campus_shortcode": "ADCVZM",
        "inst_id": 3
    },
    {
        "id": 72,
        "campus_name": "ADC ASL-BSCHOOL",
        "campus_shortcode": "ADCASL-BSCHOOL",
        "inst_id": 3
    },
    {
        "id": 75,
        "campus_name": "ADC SRPM",
        "campus_shortcode": "ADCSRPM",
        "inst_id": 3
    },
    {
        "id": 76,
        "campus_name": "ASCS KKD",
        "campus_shortcode": "ASCSKKD",
        "inst_id": 3
    },
    {
        "id": 77,
        "campus_name": "ACEDSC",
        "campus_shortcode": "ACEDSC",
        "inst_id": 4
    },
    {
        "id": 78,
        "campus_name": "APSTPG",
        "campus_shortcode": "APSTPG",
        "inst_id": 1
    },
    {
        "id": 79,
        "campus_name": "ADC TUN",
        "campus_shortcode": "ADCTUN",
        "inst_id": 3
    },
    {
        "id": 80,
        "campus_name": "AWDC ASL",
        "campus_shortcode": "AWDCASL",
        "inst_id": 3
    },
    {
        "id": 82,
        "campus_name": "AJCMDP-EAMCET",
        "campus_shortcode": "AJCMDP-EAMCET",
        "inst_id": 2
    },
    {
        "id": 83,
        "campus_name": "AJCSKLM-EAMCET",
        "campus_shortcode": "AJCSKLM-EAMCET",
        "inst_id": 2
    },
    {
        "id": 86,
        "campus_name": "AWDC GPT",
        "campus_shortcode": "AWDCGPT",
        "inst_id": 3
    },
    {
        "id": 88,
        "campus_name": "ACCES",
        "campus_shortcode": "ACCES",
        "inst_id": 4
    },
    {
        "id": 90,
        "campus_name": "AJCVSP",
        "campus_shortcode": "AJCVSP",
        "inst_id": 2
    },
    {
        "id": 91,
        "campus_name": "ADC RJY-ANM",
        "campus_shortcode": "ADCRJY-ANM",
        "inst_id": 3
    },
    {
        "id": 92,
        "campus_name": "ASMS KKD",
        "campus_shortcode": "ASMSKKD",
        "inst_id": 3
    },
    {
        "id": 93,
        "campus_name": "ADC SRPM-BSCHOOL",
        "campus_shortcode": "ADCSRPM-BSCHOOL",
        "inst_id": 3
    },
    {
        "id": 95,
        "campus_name": "SADCBVM",
        "campus_shortcode": "SADCBVM",
        "inst_id": 3
    },
    {
        "id": 96,
        "campus_name": "ADCPG SRPM",
        "campus_shortcode": null,
        "inst_id": 5
    },
    {
        "id": 97,
        "campus_name": "APSPDP",
        "campus_shortcode": "APSPDP",
        "inst_id": 1
    },
    {
        "id": 98,
        "campus_name": "AJCVSP-EAMCET",
        "campus_shortcode": null,
        "inst_id": 2
    },
    {
        "id": 99,
        "campus_name": "AWDC GWK",
        "campus_shortcode": "AWDCGWK",
        "inst_id": 3
    },
    {
        "id": 100,
        "campus_name": "ADC ASL-ANM",
        "campus_shortcode": "ADCASL-ANM",
        "inst_id": 3
    },
    {
        "id": 103,
        "campus_name": "ADCVJA",
        "campus_shortcode": "ADCVJA",
        "inst_id": 3
    },
    {
        "id": 104,
        "campus_name": "ABSRJY",
        "campus_shortcode": "ABSRJY",
        "inst_id": 3
    },
    {
        "id": 105,
        "campus_name": "ADCPGRJY",
        "campus_shortcode": "ADCPGRJY",
        "inst_id": 5
    },
    {
        "id": 106,
        "campus_name": "AGBSPG",
        "campus_shortcode": null,
        "inst_id": 5
    },
    {
        "id": 107,
        "campus_name": "TKSRJY",
        "campus_shortcode": "TKSRJY",
        "inst_id": 10
    },
    {
        "id": 108,
        "campus_name": "AJCKKDAC",
        "campus_shortcode": "AJCKKDAC",
        "inst_id": 2
    },
    {
        "id": 109,
        "campus_name": "ADCAKP",
        "campus_shortcode": "ADCAKP",
        "inst_id": 3
    },
    {
        "id": 110,
        "campus_name": "ADCGDV",
        "campus_shortcode": "ADCGDV",
        "inst_id": 3
    },
    {
        "id": 111,
        "campus_name": "ADCVJBP",
        "campus_shortcode": "ADCVJBP",
        "inst_id": 3
    },
    {
        "id": 112,
        "campus_name": "ADCVJSN",
        "campus_shortcode": "ADCVJSN",
        "inst_id": 3
    }
],
"permission_info": [
    {
        "id": 5,
        "permission_type": "Operator"
    }
],
"academic_year_info": [
    {
        "year_id": 19,
        "year_type": "0",
        "year_name": "2023-2024",
        "year_start": "2023-03-31T18:30:00.000Z",
        "year_end": "2024-03-30T18:30:00.000Z",
        "student_year": "23-24",
        "current_year": 0,
        "year_code": "23"
    }
],
"finc_year_info": [
    {
        "year_id": 20,
        "year_type": "1",
        "year_name": "2023-2024",
        "year_start": "2023-03-31T18:30:00.000Z",
        "year_end": "2024-03-30T18:30:00.000Z",
        "student_year": "23-24",
        "current_year": 0,
        "year_code": null
    }
]
}

sessionStorage.setItem('logindata',JSON.stringify(userinfo));
this.router.navigate(['/reports']);
}
  // loginForm: FormGroup;
  // constructor(private _authenticationService: AuthenticationService, private router: Router) {
  //   this.loginForm = new FormGroup({
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [Validators.required])
  //   });
  // }
  // // get email(){
  // //   return this.loginForm.get('email');
  // // }
  // // get password(){
  // //   return this.loginForm.get('password');
  // // }
  // onSubmit() {
  //   if(this.loginForm.valid) {
  //     //// console.log(this.loginForm.value.email);

  //     this._authenticationService.login(this.loginForm.value.email).subscribe(userDetails => {
  //       //// console.log(userDetails);
  //       if(userDetails.length>0){
  //       sessionStorage.setItem('logindata',JSON.stringify(userDetails));
  //       this.router.navigate(['/store']);
  //       }else{
          
  //       }
  //     }, error => {

  //     });

  //   }
  //}
  
}