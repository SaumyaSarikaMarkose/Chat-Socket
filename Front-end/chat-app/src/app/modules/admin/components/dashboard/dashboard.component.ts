import { Component } from '@angular/core';

export interface User {
  name: string;
  email: string;
  role: string;
}

const USER_DATA: User[] = [
  { name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { name: 'Charlie Brown', email: 'charlie@example.com', role: 'Moderator' },
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource = USER_DATA;

}
