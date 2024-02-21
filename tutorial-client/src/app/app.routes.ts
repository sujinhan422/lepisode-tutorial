import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { MyPagePage } from './pages/my-page/my-page.page';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { BoardComponent } from './pages/board/board.component';

export const routes: Routes = [
	{
		path: 'login',
		component: LoginPage,
	},
	{
		path: 'my-page',
		component: MyPagePage,
	},
	{
		path: 'todoList',
		component: TodoListComponent,
	},
	{
		path: 'board',
		component: BoardComponent,
	},
];
