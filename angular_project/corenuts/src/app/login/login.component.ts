import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  show = true;

  constructor(
    private router: Router,
    private formBuild: FormBuilder,
    private service: UserService
  ) {}
  selected = 'Organizer';

  loginForm = this.formBuild.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
  });

  registerForm = this.formBuild.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phonenumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    roles: new FormControl('Admin', [Validators.required]),
  });

  get username() {
    return this.registerForm.get('username');
  }

  get phonenumber() {
    return this.registerForm.get('phonenumber');
  }
  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onLogin() {
    console.log(this.loginForm.value);

    this.service.loginUser(this.loginForm.value).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('role', data.roles[0]);
      this.router.navigateByUrl('home');
    });
  }

  onRegister() {
    console.log('register');
    console.log(this.registerForm.value);
    this.service.registerUser(this.registerForm.value).subscribe((e) => {
      console.log(e);
    });
  }

  ngOnInit() {}
}
