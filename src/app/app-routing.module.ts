import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { SimpleAuthService } from './service/simple-auth.service';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent, canActivate:[SimpleAuthService]},
  {path:'welcome/:name', component: WelcomeComponent, canActivate:[SimpleAuthService]},
  {path: 'todos', component: ListTodosComponent, canActivate:[SimpleAuthService]},
  {path: 'todo/:id', component: TodoDetailComponent, canActivate:[SimpleAuthService]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
