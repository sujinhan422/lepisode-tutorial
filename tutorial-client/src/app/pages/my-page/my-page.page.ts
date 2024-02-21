import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-my-page',
	standalone: true,
	imports: [DatePipe, DecimalPipe],
	templateUrl: './my-page.page.html',
	styleUrl: './my-page.page.scss',
})
export class MyPagePage {
	now = new Date();
}
