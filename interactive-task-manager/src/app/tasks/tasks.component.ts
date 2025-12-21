import { Component, Input } from '@angular/core';
import { TasksService } from './tasks.service';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { FormsModule } from '@angular/forms';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent, FormsModule],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({required:true}) name!:string;
  @Input({required:true}) userId!:string;

  constructor(private tasksService: TasksService){}

  isAddingTask = false;
  filter: 'all' | 'pending' | 'completed' = 'all';
  // ← ADD THIS PROPERTY
  selectedTaskForEdit: Task | undefined = undefined;

  get filteredTasks(){
    const tasks = this.tasksService.getUserTasks(this.userId);
    if(this.filter === 'completed'){
      return tasks.filter(t => t.completed);
    }
    if(this.filter === 'pending'){
      return tasks.filter(t => !t.completed);
    }
    return tasks;

  }


  get selectedUserTasks(){
    return this.tasksService.getUserTasks(this.userId);
  }

  onStartAddTask(){
    this.isAddingTask = true;
    this.selectedTaskForEdit = undefined;
  }

  // ← ADD THIS METHOD
  onEditTask(task: Task) {
    this.selectedTaskForEdit = task;
    this.isAddingTask = true;
  }

  onCloseAddTask(){
    this.isAddingTask = false;
    this.selectedTaskForEdit = undefined;
  }

}
