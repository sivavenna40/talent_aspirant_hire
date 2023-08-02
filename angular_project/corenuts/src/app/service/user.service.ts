import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USERSERVICE_API_PATH } from '../constants/IMPData';
import { Login, Reset, User } from '../model/user.model';
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

  getallemails(): Observable<string[]> {
    return this.http.get<string[]>(`${USERSERVICE_API_PATH}getallemails/`);
  }

  forgotpassword(email: string): Observable<number> {
    return this.http.post<number>(`${USERSERVICE_API_PATH}otptoemail`, email);
  }

  newpassword(password: string, email: string): Observable<string> {
    email = atob(email);
    return this.http.put<string>(
      `${USERSERVICE_API_PATH}newpassword/${email}`,
      { "password": password }
    );
  }

  getbyid(user_id: number): Observable<User> {
    return this.http.get<User>(`${USERSERVICE_API_PATH}getbyid/${user_id}`);
  }

  deleteuser(user_id: number): Observable<User> {
    return this.http.get<User>(`${USERSERVICE_API_PATH}deleteuser/${user_id}`);
  }

  updateuser(user_id: number): Observable<User> {
    return this.http.get<User>(`${USERSERVICE_API_PATH}updateuser/${user_id}`);
  }

  gettingallUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${USERSERVICE_API_PATH}gettingallusers/`);
  }
}
