import { Injectable } from "@angular/core";
import { type NewTaskData } from "./new-task/new-task.model";

@Injectable({providedIn:'root'})
export class TasksService{
    private tasks = [
        {
          id: 't1',
          userId: 'u1',
          title: 'Master Angular',
          summary: 'Learn all the basic and advanced features of Angular & how to apply them.',
          dueDate: '2025-12-31',
          completed: false,
        },
        {
          id: 't2',
          userId: 'u3',
          title: 'Build first prototype',
          summary: 'Build a first prototype of the online shop website',
          dueDate: '2024-05-31',
          completed: false,
        },
        {
          id: 't3',
          userId: 'u3',
          title: 'Prepare issue template',
          summary: 'Prepare and describe an issue template which will help with project management',
          dueDate: '2024-06-15',
          completed: false,
        },
    ];

    constructor(){
        const tasks = localStorage.getItem('tasks');
        if(tasks){
            this.tasks = JSON.parse(tasks);
        }
    }


    getUserTasks(userId: string){
        return this.tasks.filter((task) => task.userId === userId);
    }

    addTask(taskData: NewTaskData, userId: string){
        this.tasks.push({
            // id: new Date().getTime.toString(),
            id: crypto.randomUUID(),
            userId: userId,
            title: taskData.title,
            summary: taskData.summary,
            dueDate: taskData.date,
            completed: false,
        })
        this.saveTasks();

    }

    toggleTaskCompletion(id: string){
        this.tasks = this.tasks.map((task) => {
            if(task.id === id){
                return {
                    ...task,
                    completed: !task.completed,
                };
            }
            return task;
        });
        this.saveTasks();
    }


    removeTask(id: string){
        this.tasks = this.tasks.filter((task)=>task.id !==id);
        this.saveTasks;
    }

    updateTask(id: string, updatedData: {title:string; summary:string; date:string}){
        this.tasks = this.tasks.map((task) =>
            task.id === id ? {
                ...task,
                title: updatedData.title,
                summary: updatedData.summary,
                date: updatedData.date,
            }
        : task
            
        );
        this.saveTasks();
    }

    private saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}