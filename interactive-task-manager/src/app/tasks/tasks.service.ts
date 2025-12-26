import { Injectable, NgZone } from '@angular/core';  
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, map } from 'rxjs';
import { Task } from './task/task.model';
import { NewTaskData } from './new-task/new-task.model';

interface UpdateTaskData {
  title?: string;
  summary?: string;
  dueDate?: string;
  completed?: boolean;
}

@Injectable({ providedIn: 'root' })
export class TasksService {
  private apiUrl = 'http://localhost:3000/tasks';  

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient, private ngZone: NgZone) {  
    this.loadTasks();
  }

  private loadTasks() {
    this.http.get<Task[]>(this.apiUrl).pipe(
      tap(tasks => {
        this.ngZone.run(() => { 
          this.tasksSubject.next(tasks);
        });
      })
    ).subscribe();
  }

  getUserTasks$(userId: string) {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.userId === userId))
    );
  }

  addTask(taskData: NewTaskData, userId: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
      completed: false,
    };

    return this.http.post<Task>(this.apiUrl, newTask).pipe(
      tap(task => {
        this.ngZone.run(() => {  
          const current = this.tasksSubject.value;
          this.tasksSubject.next([...current, task]);
        });
      })
    );
  }

  updateTask(id: string, updatedData: Partial<UpdateTaskData>) {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, updatedData).pipe(
      tap(updatedTask => {
        this.ngZone.run(() => {  // ← FORCE UI update
          const current = this.tasksSubject.value;
          const index = current.findIndex(t => t.id === id);
          if (index !== -1) {
            current[index] = updatedTask;
            this.tasksSubject.next([...current]);
          }
        });
      })
    );
  }

  toggleTaskCompletion(id: string) {
    const task = this.tasksSubject.value.find(t => t.id === id);
    if (task) {
      this.updateTask(id, { completed: !task.completed }).subscribe();
    }
  }

  removeTask(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.ngZone.run(() => {  
          const current = this.tasksSubject.value;
          this.tasksSubject.next(current.filter(t => t.id !== id));
        });
      })
    );
  }
}