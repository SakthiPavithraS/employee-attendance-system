import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-mark-attendance',
  standalone: true, // <== REQUIRED
 // <== REQUIRED
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.css']
})
export class DashboardEmployeeComponent {
  locations: string[] = ['A', 'B', 'C']; // Or dynamically fetched

  constructor(private http: HttpClient, private employeeService: EmployeeService) {}


  calculateFare(start: string, destination: string): number {
    const fareChart: { [key: string]: number } = {
      'A-B': 10, 'A-C': 20, 'B-A': 10,
      'B-C': 15, 'C-A': 20, 'C-B': 15
    };
    return fareChart[`${start}-${destination}`] || 0;
  }

  markAttendance(sessionType: string, empId: string, start: string, destination: string) {
  if (!empId || !start || !destination) {
    alert('Please enter all details!');
    return;
  }

  const today = new Date().toISOString().split('T')[0]; // e.g., 2025-06-30
  const docId = `${empId}_${today}`;

  const newData = {
    employeeId: empId,
    start,
    destination,
    fare: this.calculateFare(start, destination),
    [sessionType]: new Date().toISOString() // morning or evening key
  };

  const headers = {
    'Authorization': 'Basic ' + btoa('admin:password'),
    'Content-Type': 'application/json'
  };

  const docUrl = `http://localhost:5984/employee-attendance/${docId}`;

  this.http.get(docUrl, { headers }).subscribe({
    next: (existingDoc: any) => {
      // Document exists → update
      const updatedDoc = {
        ...existingDoc,
        ...newData,
        _rev: existingDoc._rev
      };

      this.http.put(docUrl, updatedDoc, { headers }).subscribe({
        next: () => alert(`Attendance updated for ${sessionType}`),
        error: () => alert('Failed to update attendance.')
      });
    },
    error: (err:any) => {
      if (err.status === 404) {
        // New doc → create
        this.http.put(docUrl, newData, { headers }).subscribe({
          next: () => alert(`Attendance saved for ${sessionType}`),
          error: () => alert('Failed to save attendance.')
        });
      } else {
        alert('Error checking attendance record.');
        console.error(err);
      }
    }
  });
}}
