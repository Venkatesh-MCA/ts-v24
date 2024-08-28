import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionreportComponent } from './screens/admissionreport/admissionreport.component';
import { BlankpageComponent } from './screens/blankpage/blankpage.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { managementScreensComponent } from './screens/screens.component';
import { ResultComponent } from './screens/result/result.component';
import { QrreportComponent } from './screens/qrreport/qrreport.component';
import { StrengthreportComponent } from './screens/strengthreport/strengthreport.component';
import { QuestionanalysisComponent } from './screens/questionanalysis/questionanalysis.component';
import { PapersComponent } from './screens/papers/papers.component';
import { ScheduleComponent } from './screens/schedule/schedule.component';
import { SchedulelistComponent } from './screens/schedulelist/schedulelist.component';
import { VideoformComponent } from './screens/videoform/videoform.component';
import { QuestionpaperComponent } from './screens/questionpaper/questionpaper.component';
import { QuestionhintsComponent } from './screens/questionhints/questionhints.component';
import { PptpaperComponent } from './screens/pptpaper/pptpaper.component';
import { PpthintsComponent } from './screens/ppthints/ppthints.component';
import { VideolistComponent } from './screens/videolist/videolist.component';
import { FinalresultComponent } from './screens/finalresult/finalresult.component';
import { VirtualgroupstrengthComponent } from './screens/virtualgroupstrength/virtualgroupstrength.component';
import { AuthGuard } from '../guard/auth.guard';
import { LabScheduleComponent } from './screens/lab-schedule/lab-schedule.component';
import { ScheduleReportComponent } from './screens/schedule-report/schedule-report.component';
import { ExampapersComponent } from './screens/exampapers/exampapers.component';
import { EditexamppaperComponent } from './screens/editexamppaper/editexamppaper.component';
import { FacultypapersComponent } from './screens/facultypapers/facultypapers.component';
import { ScheduleupdateComponent } from './screens/scheduleupdate/scheduleupdate.component';
import { FacultysetpapersComponent } from './screens//facultysetpapers/facultysetpapers.component';
import { FacultypaperviewComponent } from './screens/facultypaperview/facultypaperview.component';
const routes: Routes = [
  {
    path: '',
    component: managementScreensComponent,
    children:[
      {
        path:'',
        component: DashboardComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'dashboard',
        component: DashboardComponent,
        canActivate : [AuthGuard]
      },
      // {
      //   path:'vgroupreport/:papercode',
      //   component: VirtualgroupstrengthComponent
         
      // },
      {
        path:'admissionreport',
        component: AdmissionreportComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'blankpage',
        component: BlankpageComponent
      },
      {
        path:'result/:papercode',
        component: ResultComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'qr/:papercode',
        component: QrreportComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'strength/:papercode',
        component: StrengthreportComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'quesanalysis/:papercode/:suc',
        component: QuestionanalysisComponent
      },
      {
        path:'questionpaper/:papercode',
        component: QuestionpaperComponent
      },
      {
        path:'hintspaper/:papercode',
        component: QuestionhintsComponent
      },
      {
        path:'pptpaper/:papercode/:subject',
        component: PptpaperComponent
      },
      {
        path:'ppthintspaper/:papercode/:subject',
        component: PpthintsComponent
      },
      {
        path:'videolist/:papercode/:subject',
        component: VideolistComponent
      },
      
      {
        path:'papers',
        component: PapersComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'schedule/:papercode',
        component: ScheduleComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'schedule/:papercode/:mngid',
        component: ScheduleupdateComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'schedulelist/:papercode',
        component: SchedulelistComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'videoform/:papercode/:subject',
        component: VideoformComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'finalresult/:papercode',
        component: FinalresultComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'labschedule',
        component: LabScheduleComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'labschedulereport/:ppcode',
        component: ScheduleReportComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'exampapers',
        component: ExampapersComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'editexampapers/:papercode',
        component: EditexamppaperComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'facultypapers',
        component: FacultypapersComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'facultysetpaper',
        component:  FacultysetpapersComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'facultypaper/:uid',
        component:  FacultypaperviewComponent,
        canActivate : [AuthGuard]
      }
      
      

      
      
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
