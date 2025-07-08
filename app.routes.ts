import { Routes } from '@angular/router';

// Import all standalone components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { MarkAttendanceComponent } from './components/mark-attendance/mark-attendance.component';
import { DashboardEmployeeComponent } from './components/dashboard-employee/dashboard-employee.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ReportComponent } from './components/report/report.component';
import { HomeComponent } from './components/home/home.component'; // layout component (with router-outlet)
import { AuthGuard } from './services/auth.guard'; // Optional route guard

export const routes: Routes = [
  // Default route redirects to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home',component:HomeComponent},
  { path: 'admin-dashboard', component: DashboardAdminComponent },
   { path: 'dashboard-employee', component: DashboardEmployeeComponent },
  //  {path:'mark-attendance',component:MarkAttendanceComponent},
  // Protected shell route
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard], // Optional if you're protecting whole layout
    children: [
      { path: 'employee-dashboard', component: DashboardEmployeeComponent },
      { path: 'admin-dashboard', component: DashboardAdminComponent },
      // { path: 'mark-attendance', component: MarkAttendanceComponent },
      { path: 'report', component: ReportComponent },
    ]
  },

  // Wildcard route for 404
  { path: '**', redirectTo: 'login' }
];
