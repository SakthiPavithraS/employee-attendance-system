import { Component } from '@angular/core';
import { CouchService } from '../../services/couch.services';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private couchService: CouchService) {}

  register(employeeId: string, startDestination: string) {
    const employeeData = {
      employeeId: employeeId,
      startDestination: startDestination,
      timestamp: new Date().toISOString()
    };

    this.couchService.registerEmployee(employeeData).subscribe({
       next: (response: any) => {
    console.log('Employee registered:', response);
    alert('Employee registered successfully!');
  },
  error: (error: any) => {
    console.error('Error registering employee:', error);
    alert('Error saving data to CouchDB');
  }
});
  }
}
