import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, User } from '../model/user.model';
import { Observable } from 'rxjs';
import { USERSERVICE_API_PATH } from '../constants/IMPData';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<User> {
    user.roles = [user.roles + ''];
    return this.http.post<User>(`${USERSERVICE_API_PATH}register`, user);
  }

  loginUser(login: any): Observable<Login> {
    return this.http.post<Login>(`${USERSERVICE_API_PATH}login`, login);
  }
}
