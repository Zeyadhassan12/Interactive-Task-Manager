import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { USERS_NAMES } from './users_name';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = USERS_NAMES;
  selectedUserID?: string;

  get selectedUser(){
    return this.users.find((user) => user.id === this.selectedUserID)!;
  }

  onSelectUser(id: string){
    this.selectedUserID = id;
  }
}
