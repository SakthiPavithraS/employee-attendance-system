import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { DashboardEmployeeComponent } from './components/dashboard-employee/dashboard-employee.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ReportComponent } from './components/report/report.component';

import { AuthService } from './services/auth.services';
import { AttendanceService } from './services/attendance.services';
import { SalaryService } from './services/salary.service';
import { AuthGuard } from './services/auth.guard';


export class AppModule {}
// src/app/models/employee.model.ts
export interface Employee {
  empId: string;
  password: string;
}
