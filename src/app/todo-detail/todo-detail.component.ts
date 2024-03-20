import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { JWTAuthService } from '../service/jwt-auth.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  todo = new Todo (0, "Enter your Todo here", false, new Date());
  //id: number;
  
  constructor(private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private jwtAuthService: JWTAuthService) { }

  ngOnInit() {
    this.todo.id = this.route.snapshot.params['id'];
    //console.log("ID= " + this.todo.id);
    if(this.todo.id != -1)
      this.retrieveTodo(this.todo.id);
  }

retrieveTodo (id:number){

  let username = this.jwtAuthService.getLoggedUser();
  if (username == null) return;

  this.todoService.executeRetrieveTodo(username, id).subscribe(
    response => {
      this.todo = response;
      //console.log("Description= " + this.todo.description);
      }
    )
  }

  updateTodo (id: number) {
    if(id == -1){
      this.createTodo();
    } else {

      let username = this.jwtAuthService.getLoggedUser();
      if (username == null) return;

      this.todoService.executeUpdateTodo(username, id, this.todo)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['todos']);
          }
        )
    }
  }

  createTodo () {

    let username = this.jwtAuthService.getLoggedUser();
    if (username == null) return;

    this.todoService.executeAddTodo(username, this.todo)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['todos']);
        }
      )
  }

}
