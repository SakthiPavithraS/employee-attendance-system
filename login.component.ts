import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule,RouterModule], 
})
export class LoginComponent {
  empId:string= '';
  password:string= '';
  loginError = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  login() {
    this.employeeService.getAllEmployees().subscribe((data: any) => {
      const docs = data.rows.map((row: any) => row.doc);
      const match = docs.find((emp: any) =>
        emp.empId === this.empId && emp.password === this.password
      );

      if (match) {
        this.router.navigate(['/home']);
      } else {
        this.loginError = 'Invalid ID or password';
      }
    });
  }
}
