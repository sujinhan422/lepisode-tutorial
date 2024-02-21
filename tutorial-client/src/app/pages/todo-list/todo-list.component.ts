import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { InputComponent } from '../../input/input.component';
import { LepiButton, LepiInputText } from '@team-lepisode/components';
import { LepiAutoAnimateDirective } from '@team-lepisode/directives';

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [
		DatePipe,
		InputComponent,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		LepiInputText,
		LepiButton,
		LepiAutoAnimateDirective,
	],
	templateUrl: './todo-list.component.html',
	styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
	tasks = signal<Task[]>([]);

	form = new FormGroup({
		task: new FormControl('', {
			validators: [Validators.required],
			nonNullable: true,
		}),
	});

	// Callback 함수에서 사용된 signal의 값이 변할 때마다 실행
	count = computed(() => this.tasks().length);

	now = new Date();

	constructor(
		private readonly router: Router,
		private readonly httpClient: HttpClient
	) {
		// Callback 함수에서 사용된 signal의 값이 변할 때마다 실행
		effect(() => this.saveTasks());
	}

	// 컴포넌트가 실행된 직후에 실행되는 Lifecycle Hook
	ngOnInit(): void {
		// Localstorage에 저장된 데이터를 조회한다.
		const storedData = localStorage.getItem('tasks');
		if (storedData) {
			// 저장된 데이터를 Task 타입의 배열로 변환한다.
			const tasks = JSON.parse(storedData!!);
			// 컴포넌트 내에 배열에 저장한다.
			this.tasks.set(tasks);
		}
	}

	addTask() {
		const { task } = this.form.getRawValue();
		this.tasks.update((tasks) => [
			...tasks,
			{
				content: task,
				date: new Date(),
			},
		]);

		this.form.reset();
	}

	deleteTask(index: number) {
		// const temp = this.tasks();
		// temp.splice(index, 1);
		// this.tasks.set(temp);
		this.tasks.update((tasks) => {
			tasks.splice(index, 1);
			return tasks;
		});

		this.saveTasks();
	}

	saveTasks() {
		localStorage.setItem('tasks', JSON.stringify(this.tasks()));
	}
}

type Task = {
	content: string;
	date: Date;
};
