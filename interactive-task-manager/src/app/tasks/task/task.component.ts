import { Component,Input,inject } from '@angular/core';
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
})
export class TaskComponent {
  @Input({required:true}) task!: Task;

  private tasksService = inject(TasksService);

  onCompleteTask(){
    this.tasksService.removeTask(this.task.id);
  }
}
