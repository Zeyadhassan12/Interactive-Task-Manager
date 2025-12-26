import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { TasksService } from './tasks.service';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { Task } from './task/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskComponent, NewTaskComponent, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnChanges {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) userId!: string;

  isAddingTask = false;
  selectedTaskForEdit: Task | undefined = undefined;

  private filterSubject = new BehaviorSubject<'all' | 'pending' | 'completed'>('all');
  filter$ = this.filterSubject.asObservable();

  
  set filter(value: 'all' | 'pending' | 'completed') {
    this.filterSubject.next(value);
  }

  get filter(): 'all' | 'pending' | 'completed' {
    return this.filterSubject.value;
  }

  userTasks$!: Observable<Task[]>;
  filteredTasks$!: Observable<Task[]>;
  activeCount$!: Observable<number>;

  constructor(private tasksService: TasksService) {}

  ngOnChanges() {
    this.userTasks$ = this.tasksService.getUserTasks$(this.userId);

    this.filteredTasks$ = combineLatest([this.userTasks$, this.filter$]).pipe(
      map(([tasks, filter]) => {
        if (filter === 'completed') return tasks.filter(t => t.completed);
        if (filter === 'pending') return tasks.filter(t => !t.completed);
        return tasks;
      })
    );

    this.activeCount$ = this.userTasks$.pipe(
      map(tasks => tasks.filter(t => !t.completed).length)
    );
  }

  onStartAddTask() {
    this.isAddingTask = true;
    this.selectedTaskForEdit = undefined;
  }

  onEditTask(task: Task) {
    this.selectedTaskForEdit = task;
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
    this.selectedTaskForEdit = undefined;
  }
}


