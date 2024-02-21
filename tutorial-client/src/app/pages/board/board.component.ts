import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, effect, signal } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
	selector: 'app-board',
	standalone: true,
	imports: [
		FormsModule,
		RouterModule,
		ReactiveFormsModule,
		CommonModule,
		DatePipe,
	],
	templateUrl: './board.component.html',
	styleUrl: './board.component.scss',
})
export class BoardComponent {
	boardVo = signal<boardVo[]>([]);

	form = new FormGroup({
		write: new FormControl('', {
			validators: [Validators.required],
			nonNullable: true,
		}),
	});

	now = new Date();

	constructor(
		private readonly router: Router,
		private readonly httpClient: HttpClient
	) {
		// Callback 함수에서 사용된 signal의 값이 변할 때마다 실행
		effect(() => this.saveBoard());
	}

	// 컴포넌트가 실행된 직후에 실행되는 Lifecycle Hook
	ngOnInit(): void {
		// Localstorage에 저장된 데이터를 조회한다.
		const storedData = localStorage.getItem('boardVo');
		if (storedData) {
			// 저장된 데이터를 Task 타입의 배열로 변환한다.
			const tasks = JSON.parse(storedData!!);
			// 컴포넌트 내에 배열에 저장한다.
			this.boardVo.set(tasks);
		}
	}

	addBoard() {
		const { write } = this.form.getRawValue();
		this.boardVo.update((boardVo) => [
			...boardVo,
			{
				content: write,
				date: new Date(),
			},
		]);

		this.form.reset();
	}

	deleteBoard(index: number) {
		// const temp = this.tasks();
		// temp.splice(index, 1);
		// this.tasks.set(temp);
		this.boardVo.update((boardVo) => {
			boardVo.splice(index, 1);
			return boardVo;
		});

		this.saveBoard();
	}

	saveBoard() {
		localStorage.setItem('boardVo', JSON.stringify(this.boardVo()));
	}
}

type boardVo = {
	content: string;
	date: Date;
};
