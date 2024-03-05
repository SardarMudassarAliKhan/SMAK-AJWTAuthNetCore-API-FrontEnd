import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent }
];

@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class DashBoradsModule { }
