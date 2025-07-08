// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private couchUrl = 'http://localhost:5984/employee-attendance';
   private dbUrl = 'http://localhost:5984/employees/_all_docs?include_docs=true';



  constructor(private http: HttpClient) {}

registerEmployee(data: any) {
  const headers = {
    'Authorization': 'Basic ' + btoa('admin:password'),
    'Content-Type': 'application/json'
  };
  return this.http.post('http://localhost:5984/employee_register', data,{ headers });
}

  
  getAllEmployees(): Observable<any> {
    const headers = {
    'Authorization': 'Basic ' + btoa('admin:password'),
    'Content-Type': 'application/json'
  };
    return this.http.get(this.dbUrl,{ headers });
  }
  getAllAttendance(): Observable<any> {
  const headers = {
    'Authorization': 'Basic ' + btoa('admin:password'),
    'Content-Type': 'application/json'
  };
  return this.http.get('http://localhost:5984/employee-attendance/_all_docs?include_docs=true', { headers });
}

  saveAttendance(data: any) {
    const headers = {
    'Authorization': 'Basic ' + btoa('admin:password'),
    'Content-Type': 'application/json'
  };
    return this.http.post(this.couchUrl, data,{ headers });
  }
}


