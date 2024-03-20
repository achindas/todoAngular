import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { JWTAuthService } from '../service/jwt-auth.service';

export class Todo {

  constructor(
    public id:number,
    public description: string,
    public status: boolean,
    public targetDate: Date
  ) { 

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})

export class ListTodosComponent implements OnInit {

  // todos = [
  //   new Todo (1, "Learn to Dance", false, new Date()),
  //   new Todo (2, "Master Angular", true, new Date()),
  //   new Todo (3, "Visit Egypt", false, new Date())
  //   // {id: 1, description: "Learn to Dance"},
  //   // {id: 2, description: "Master Angular"},
  //   // {id: 3, description: "Visit Egypt"}
  // ]

  todos: Todo[] = [];
  message: string = "";

  constructor(private todoService: TodoDataService,
    private router: Router,
    private jwtAuthService: JWTAuthService) { }

  ngOnInit() {

    this.retrieveAllTodos();
    
  }

  retrieveAllTodos() {

    let username = this.jwtAuthService.getLoggedUser();
    if (username == null) return;

    this.todoService.executeRetrieveAllTodos(username).subscribe(
      response => {
        this.todos = response;
      }
    )
  }

  deleteTodo(id:number) {

    let username = this.jwtAuthService.getLoggedUser();
    if (username == null) return;

    this.todoService.executeDeleteTodo(username, id).subscribe(
      response => {
        if (response != null) {
          this.message = "Delete is not successful";
        } else {
          this.message = `Delete of Todo ${id} is successful`;
          this.retrieveAllTodos();
        }
      }
    )
  }

  updateTodo(id:number) {
    this.router.navigate(['todo', id])
  }

  addTodo() {
    this.router.navigate(['todo', -1])
  }

}
