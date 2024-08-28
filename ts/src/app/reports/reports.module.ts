import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ManagementRoutingModule } from './reports-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { managementScreensComponent } from './screens/screens.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { BlankpageComponent } from './screens/blankpage/blankpage.component';
import { AdmissionreportComponent } from './screens/admissionreport/admissionreport.component';
import { ResultComponent } from './screens/result/result.component';
import { QrreportComponent } from './screens/qrreport/qrreport.component';
import { StrengthreportComponent } from './screens/strengthreport/strengthreport.component';
import {DataTablesModule} from 'angular-datatables';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionanalysisComponent } from './screens/questionanalysis/questionanalysis.component';
import { PapersComponent } from './screens/papers/papers.component';
import { ScheduleComponent } from './screens/schedule/schedule.component';
import { LoadingComponent } from './screens/loading/loading.component';
import { SchedulelistComponent } from './screens/schedulelist/schedulelist.component';
import { IdinarupeesPipe } from '../idinarupees.pipe';
import { VideoformComponent } from './screens/videoform/videoform.component';
import { FiltefilterPipe } from '../filtefilter.pipe';
import { QuestionpaperComponent } from './screens/questionpaper/questionpaper.component';
import { QuestionhintsComponent } from './screens/questionhints/questionhints.component';
import { PptpaperComponent } from './screens/pptpaper/pptpaper.component';
import { MathJaxDirective } from '../directives/math-jax.directive';
import { PpthintsComponent } from './screens/ppthints/ppthints.component';
import { VideolistComponent } from './screens/videolist/videolist.component';
import { FinalresultComponent } from './screens/finalresult/finalresult.component';
import { VirtualgroupstrengthComponent } from './screens/virtualgroupstrength/virtualgroupstrength.component';

import { LabScheduleComponent } from './screens/lab-schedule/lab-schedule.component';
import { ScheduleReportComponent } from './screens/schedule-report/schedule-report.component';
import { ExampapersComponent } from './screens/exampapers/exampapers.component';
import { EditexamppaperComponent } from './screens/editexamppaper/editexamppaper.component';
import { FacultypapersComponent } from './screens/facultypapers/facultypapers.component';
import { ScheduleupdateComponent } from './screens/scheduleupdate/scheduleupdate.component';
import { FacultysetpapersComponent } from './screens/facultysetpapers/facultysetpapers.component';
import { FacultypaperviewComponent } from './screens/facultypaperview/facultypaperview.component';
@NgModule({
  declarations: [
    MenuComponent,
    managementScreensComponent,
    DashboardComponent,
    BlankpageComponent,
    AdmissionreportComponent,
    ResultComponent,
    QrreportComponent,
    StrengthreportComponent,
    QuestionanalysisComponent,
    PapersComponent,
    ScheduleComponent,
    LoadingComponent,
    SchedulelistComponent,
    IdinarupeesPipe,
    FiltefilterPipe,
    VideoformComponent,
    QuestionpaperComponent,
    QuestionhintsComponent,
    MathJaxDirective,
    PptpaperComponent,
    PpthintsComponent,
    VideolistComponent,
    FinalresultComponent,
    VirtualgroupstrengthComponent,
     
    LabScheduleComponent,
    ScheduleReportComponent,
    ExampapersComponent,
    EditexamppaperComponent,
    FacultypapersComponent,
    ScheduleupdateComponent,
    FacultysetpapersComponent,
    FacultypaperviewComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule,
    HttpClientModule, 
    Ng2SearchPipeModule,
    DataTablesModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class ReportsModule { }
