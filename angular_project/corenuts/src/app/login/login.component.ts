// import { FormBuilder, FormControl, Validators } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../service/user.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   show = true;

//   constructor(
//     private router: Router,
//     private formBuild: FormBuilder,
//     private service: UserService
//   ) {}
//   selected = 'Organizer';

//   loginForm = this.formBuild.group({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [
//       Validators.required,
//       Validators.minLength(7),
//     ]),
//   });

//   registerForm = this.formBuild.group({
//     username: new FormControl('', [Validators.required]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     phonenumber: new FormControl('', [
//       Validators.required,
//       Validators.minLength(10),
//     ]),
//     password: new FormControl('', [
//       Validators.required,
//       Validators.minLength(7),
//     ]),
//     roles: new FormControl('Admin', [Validators.required]),
//   });

//   get username() {
//     return this.registerForm.get('username');
//   }

//   get phonenumber() {
//     return this.registerForm.get('phonenumber');
//   }
//   get email() {
//     return this.registerForm.get('email');
//   }

//   get password() {
//     return this.registerForm.get('password');
//   }

//   onLogin() {
//     console.log(this.loginForm.value);

//     this.service.loginUser(this.loginForm.value).subscribe((data: any) => {
//       console.log(data);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('email', data.email);
//       localStorage.setItem('role', data.roles[0]);
//       this.router.navigateByUrl('home');
//     });
//   }

//   onRegister() {
//     console.log('register');
//     console.log(this.registerForm.value);
//     this.service.registerUser(this.registerForm.value).subscribe((e) => {
//       console.log(e);
//     });
//   }

//   ngOnInit() {}
// }
import { MessageService } from 'primeng/api';
import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements DoCheck, OnChanges, OnInit {
  showForgotPassword: boolean = false;
  isenteringotp: boolean = false;
  changepassword: boolean = false;

  constructor(
    private commonservice: CommonService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuild: FormBuilder,
    private service: UserService,
    private messageService: MessageService
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }
  resetForm = this.formBuild.group({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  loginForm = this.formBuild.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  forgotpasswordForm = this.formBuild.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  registerForm = this.formBuild.group({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))'
      ),
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    role: new FormControl('user'),
    status: new FormControl('active'),
  });

  get first_name() {
    return this.registerForm.get('first_name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }
  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get phone_number() {
    return this.registerForm.get('phone_number');
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid Credentials',
    });
  }
  get confirmpassword() {
    return this.resetForm.get('confirmpassword');
  }

  getcurrentuser() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (token != null && user != null) {
      return user;
      // console.log(atob(tok));
      // console.log(JSON.parse(atob(user)));
    } else return '';
  }

  getrole() {
    let role = localStorage.getItem('role');
    if (role != null) return role;
    else return '';
  }
  islogedin() {
    if (this.getcurrentuser() != '') {
      return true;
    } else return false;
  }
  onLogin() {
    console.log(this.loginForm.value);
    this.service.loginUser(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.roles[0]);
        let role = localStorage.getItem('role');
        if (role == 'Interviewer' || role == 'Admin' || role == 'Organizer') {
          this.router.navigateByUrl('home');
          this.openSnackBar('log in as ' + role, 'OK');
        }
      },
      (error) => {
        this.showError();
      }
    );
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Password Reset Successful',
    });
  }
  reset() {
    console.log(this.resetForm.value.password);

    this.resetForm.value.password = this.resetForm.value.password as string;

    let email = localStorage.getItem('email') || '';
    this.service
      .newpassword(this.resetForm.value.password, email)
      .subscribe((data: any) => {
        console.log(data);
        this.proceedtoResetpage = false;
        this.isotpcorrectcolour = false;
        this.showForgotPassword = false;
        this.openSnackBar('Password Changed Successfull', 'OK');
        this.isenteringotp = false;
        this.changepassword = false;
        this.isotpcorrect = false;
      });
    this.proceedtoResetpage = false;
    this.isotpcorrectcolour = false;
    this.showForgotPassword = false;
    this.isenteringotp = false;
    this.changepassword = false;
    this.isotpcorrect = false;
    this.openSnackBar('Password Changed Successfull', 'OK');
  }

  proceedToSignUpPage: boolean = false;
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  deleteUser(user_id: number) {
    this.service.deleteuser(user_id);
    this.gettingAllUsers;
  }
  gettingAllUsers() {
    this.service.gettingallUsers();
  }
  gettingAllEmails() {
    this.service.getallemails();
  }

  forgotpassword() {
    this.showForgotPassword = true;
    console.log(this.showForgotPassword);
  }

  onSubmitForgotPassword() {
    this.isenteringotp = true;
    localStorage.setItem(
      'email',
      btoa(this.forgotpasswordForm.value.email as string)
    );
    console.log(this.forgotpasswordForm.value.email);
    if (this.forgotpasswordForm.value.email != null) {
      this.sendemailForgotPassword(this.forgotpasswordForm.value);
    }
  }

  sendemailForgotPassword(email: any) {
    this.startTimer(); // start timer for verify otp
    console.log(email);
    this.service.forgotpassword(email).subscribe((data) => {
      this.currentotp = Number(data) + '';
      console.log(data);
    });
  }

  currentotp: string = '';
  first: string = '';
  second: string = '';
  third: string = '';
  fourth: string = '';
  isotpcorrect: boolean = false;
  proceedtoResetpage: boolean = false;

  remainingTime: number = 60;
  timerId: any;

  ngOnInit() {}

  resetFields() {
    this.first = '';
    this.second = '';
    this.third = '';
    this.fourth = '';
  }
  resendotp() {
    this.resetFields();
    this.remainingTime = 60;
    let email = localStorage.getItem('email');
    if (email != null) {
      this.sendemailForgotPassword({ email: atob(email) + '' });
    }
    this.borderColor = 'blue';
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        this.timerExpired();
        this.stopTimer();
      }
    }, 1000);
  }

  timerExpired() {
    console.log('Timer expired!');
  }

  stopTimer() {
    clearInterval(this.timerId);
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngDoCheck() {
    if (
      (this.first != '' &&
        this.second != '' &&
        this.third != '' &&
        this.fourth != '') ||
      (this.first != undefined &&
        this.second != undefined &&
        this.third != undefined &&
        this.fourth != undefined) ||
      (this.first != ' ' &&
        this.second != ' ' &&
        this.third != ' ' &&
        this.fourth != ' ')
    ) {
      if (this.currentotp != '') {
        let otpentered =
          this.first + '' + this.second + '' + this.third + '' + this.fourth;

        if (otpentered == this.currentotp) {
          this.isotpcorrectcolour = true;
          this.getDynamicStyles();
          setTimeout(() => {
            this.proceedtoResetpage = true;
          }, 1000);
        } else {
          if (otpentered.trim().length < 4) {
            return;
          }
          this.isotpcorrect = false;
          this.getDynamicStyles();
        }
      }
    }
  }
  isotpcorrectcolour: boolean = false;
  borderColor: string = 'blue';
  getDynamicStyles() {
    if (this.isotpcorrectcolour) {
      this.borderColor = 'green';
    } else {
      this.borderColor = 'red';
    }
  }
  resetit() {
    this.registerForm.reset(this.registerForm.value);
    this.registerForm.reset();
    console.log('destroycalled');
  }
}
