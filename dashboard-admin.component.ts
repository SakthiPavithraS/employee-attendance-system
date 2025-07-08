import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  @ViewChild('registeredTable', { static: true }) registeredTable!: ElementRef;
  @ViewChild('attendanceTable', { static: true }) attendanceTable!: ElementRef;
  @ViewChild('reportTable', { static: true }) reportTable!: ElementRef;

  constructor(private http: HttpClient) {}

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('admin:admin') // change your CouchDB credentials
    })
  };

  ngOnInit(): void {
    this.loadRegisteredEmployees();
    this.loadAttendance();
  }

  loadRegisteredEmployees() {
    this.http.post<any>('http://localhost:5984/employee_register/_find', { selector: {} }, this.headers)
      .subscribe(res => {
        const employees = res.docs;
        employees.forEach((emp: any) => {
          const row = this.registeredTable.nativeElement.insertRow();
          row.innerHTML = `
            <td>${emp.empId || ''}</td>
            <td>${emp.name || ''}</td>
            <td>${emp.startLocation || ''}</td>
            <td>${emp.destination || ''}</td>
          `;
        });
      });
  }

  loadAttendance() {
    this.http.post<any>('http://localhost:5984/employee-attendance/_find', { selector: {} }, this.headers)
      .subscribe(res => {
        const attendance = res.docs;
        const fareMap: { [key: string]: { sessions: number; days: Set<string> } } = {};

        attendance.forEach((record: any) => {
          // Attendance Table
          const row = this.attendanceTable.nativeElement.insertRow();
          row.innerHTML = `
            <td>${record.empId || ''}</td>
            <td>${record.date || ''}</td>
            <td>${record.session || ''}</td>
            <td>${record.time || ''}</td>
          `;

          // Fare Calculation
          const empId = record.empId;
          const date = record.date;
          if (!fareMap[empId]) {
            fareMap[empId] = { sessions: 0, days: new Set() };
          }
          fareMap[empId].sessions += 1;
          fareMap[empId].days.add(date);
        });

        const farePerSession = 20;
        Object.entries(fareMap).forEach(([empId, data]) => {
          const totalFare = data.sessions * farePerSession;
          const row = this.reportTable.nativeElement.insertRow();
          row.innerHTML = `
            <td>${empId}</td>
            <td>${data.days.size}</td>
            <td>${totalFare}</td>
          `;
        });
      });
  }
}
