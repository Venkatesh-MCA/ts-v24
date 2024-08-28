import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
//import { StoreModule } from './store/store.module';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportsModule } from './reports/reports.module';
import { OperatorModule } from './operator/operator.module';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'operator',
    loadChildren: () => import('./operator/operator.module').then(module => module.OperatorModule),
    canActivate : [AuthGuard]
  },
  {
    path:'reports',
    loadChildren: () => import('./reports/reports.module').then(module => module.ReportsModule),
    canActivate : [AuthGuard]
  },
  
  // {
  //   path:'store',
  //   loadChildren: () => import('./store/store.module').then(module => module.StoreModule),
  //   canActivate : [AuthGuard]
  // },
  {
    path:'login',component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ AdminModule,ReportsModule ]
