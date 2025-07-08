import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouchService {
  private dbUrl = ' http://localhost:5984/employee_register'; // Replace with your actual CouchDB URL

  constructor(private http: HttpClient) {}

  registerEmployee(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:password') // Replace with your CouchDB username:password
    });

    return this.http.post(this.dbUrl, data, { headers });
  }
}
