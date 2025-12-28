# Interactive-Task-Manager
 build a simple, responsive, single-page application (SPA) that functions as an interactive task management tool (To-Do List).

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Installation Instructions](#installation-instructions)


## Description

A modern, responsive single-page task management application built with Angular (standalone components, RxJS, HttpClient) that demonstrates professional frontend development practices.

## Features

- Full CRUD operations (Create, Read, Update, Delete) for tasks
- Real-time task filtering (All / Pending / Completed)
- Dynamic active tasks count display
Mark tasks as completed with visual status indicator (green circle + checkmark)
- Inline editing of existing tasks using a reusable modal
- Persistent data storage via an external REST API (json-server)
- Clean, responsive UI with card-based task layout and centered modal forms
- State management using RxJS - BehaviorSubject and async pipe
- Optimistic UI updates with proper error handling

## Technologies

- Angular (standalone components, signals, reactive patterns)
- RxJS for reactive state management
- HttpClient for API communication
- json-server as a mock backend for full CRUD persistence
- Pure CSS for styling (mobile-first, flexible layout)

## Installation Instructions

1. Clone the Repository :

    ```Bash
        git clone https://github.com/Zeyadhassan12/Interactive-Task-Manager.git
2. Navigate to the interactive-task-manager directory :

    ```bash
        cd interactive-task-manager

3. Start the backend API

    ```bash
        npm install -g json-server
        json-server --watch db.json --port 3000
4. Start the Angular app

    ```bash
        ng serve
