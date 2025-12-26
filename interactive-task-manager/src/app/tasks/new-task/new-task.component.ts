import { Component, EventEmitter, Input, Output, inject, SimpleChanges, OnChanges } from '@angular/core';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent implements OnChanges {
  @Input({required:true}) userId!:string; 
  @Input() task?: Task;  
  @Output() close = new EventEmitter<void>();

  enteredTitle= '';
  enteredSummary='';
  enteredDate='';

  private tasksService = inject(TasksService);


  // When editing
  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.enteredTitle = this.task.title;
      this.enteredSummary = this.task.summary;
      this.enteredDate = this.task.dueDate;
    }
  }

  onCancel(){
    this.close.emit();
  }


  onSubmit() {
    if (this.task) {
      // Editing existing task
      this.tasksService.updateTask(this.task.id, {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        dueDate: this.enteredDate,
      }).subscribe();
    } else {
      // Adding new task
      this.tasksService.addTask(
        {
          title: this.enteredTitle,
          summary: this.enteredSummary,
          date: this.enteredDate,
        },
        this.userId
      ).subscribe();
    }
    this.close.emit();
  }
}
