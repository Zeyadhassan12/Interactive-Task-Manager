import { Component, EventEmitter, Input, Output, inject, SimpleChanges, OnChanges } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task/task.model';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-new-task',
  imports: [ CommonModule, ReactiveFormsModule ],
  standalone: true,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent implements OnChanges {
  @Input({required:true}) userId!:string; 
  @Input() task?: Task;  
  @Output() close = new EventEmitter<void>();

  taskForm : FormGroup;

  private tasksService = inject(TasksService);
  private fb = inject(FormBuilder);

  constructor(){
    this.taskForm = this.fb.group({
        title: ["",Validators.required],
        summary:["",Validators.required],
        date:["",Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges){
      if (changes['task'] && this.task){
        this.taskForm.patchValue({
          title: this.task.title,
          summary:this.task.summary,
          date:this.task.dueDate
        });
      }
  }

  get title(){
    return this.taskForm.get('title');
  }

  get summary(){
    return this.taskForm.get('summary');
  }

  get date(){
    return this.taskForm.get('date');
  }

  onCancel(){
    this.taskForm.reset();
    this.close.emit();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const { title, summary, date } = this.taskForm.value;

      if (this.task) {
        // Edit
        this.tasksService.updateTask(this.task.id!, {
          title: title!,
          summary: summary!,
          dueDate: date!
        }).subscribe(() => this.close.emit());
      } else {
        // Add
        this.tasksService.addTask({
          title: title!,
          summary: summary!,
          date: date!
        }, this.userId).subscribe(() => this.close.emit());
      }
    }
  }
}
