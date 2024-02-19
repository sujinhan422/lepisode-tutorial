import { Component } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {

  form = new FormGroup({
    email: new FormControl('test', [Validators.required]),
    password: new FormControl('test1', [Validators.required]),
  })


  // DI (Dependency Injection)
  // 이 어플리케이션 전체에 딱 하나 있는걸 가져다 쓴다.
  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient
  ) {  }

  submit() {

   this.httpClient.post('http://localhost:3000/user', this.form.value).subscribe({
    next: (response) => {
      alert(response)
    }
   })
  }

}
