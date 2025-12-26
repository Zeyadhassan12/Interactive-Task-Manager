import { Component,Input,inject, ChangeDetectionStrategy,Output, EventEmitter } from '@angular/core';
import {type Task} from './task.model';
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';
import { CardComponent } from "../../shared/card/card.component";


@Component({
  selector: 'app-task',
  imports: [CardComponent,DatePipe],
  templateUrl: './task.component.html',
  standalone: true,
  styleUrl: './task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  @Input({required:true}) task!: Task;
  @Output() edit = new EventEmitter<Task>();  
  private tasksService = inject(TasksService);

  onToggleComplete(){
    this.tasksService.toggleTaskCompletion(this.task.id);
  }

  onDeleteTask() {
  this.tasksService.removeTask(this.task.id).subscribe({
  });
}

  onEditTask() {
    this.edit.emit(this.task);
  }
}
