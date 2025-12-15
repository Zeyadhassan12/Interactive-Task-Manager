import { Component, Input } from '@angular/core';
import { TasksService } from './tasks.service';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({required:true}) name!:string;
  @Input({required:true}) userId!:string;

  constructor(private tasksService: TasksService){}

  isAddingTask = false;


  get selectedUserTasks(){
    return this.tasksService.getUserTasks(this.userId);
  }

  onStartAddTask(){
    this.isAddingTask = true;
  }

  onCloseAddTask(){
    this.isAddingTask = false;
  }

}
