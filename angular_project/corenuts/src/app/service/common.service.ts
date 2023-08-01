import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getcurrentuser() {
    let user = localStorage.getItem('email');
    if (user != null) {
      return user;
    } else return '';
  }

  getrole() {
    let role = localStorage.getItem('role');
    if (role != null) return role;
    else return '';
  }

  isloggedin() {
    if (this.getcurrentuser() != '') {
      return true;
    } else return false;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return token;
    } else return '';
  }
}
