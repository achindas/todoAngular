import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, DB_API_URL } from 'src/app/app.constants';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private todoService: HttpClient) {}
  
  executeRetrieveAllTodos(name:string) {
    return this.todoService.get<Todo[]>(`${DB_API_URL}/get-all-todos/user/${name}/todos`);
  }

  executeRetrieveTodo(name:string, id:number) {
    return this.todoService.get<Todo>(`${DB_API_URL}/get-todo/user/${name}/todo/${id}`);
  }

  executeDeleteTodo(name:string, id:number) {
    return this.todoService.delete<string>(`${DB_API_URL}/delete-todo/user/${name}/todo/${id}`);
  }

  executeUpdateTodo(name:string, id:number, todo:Todo) {
    return this.todoService.put(`${DB_API_URL}/update-todo/user/${name}/todo/${id}`,
      todo);
  }

  executeAddTodo(name:string, todo:Todo) {
    console.log("Username: " + name)
    return this.todoService.post(`${DB_API_URL}/add-todo/user/${name}/todo`,
      todo);
  }
}
