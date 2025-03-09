import { inject, Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import {User} from '../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7079/api/User'

  constructor() { }

  http = inject(HttpClient)

  getAllUsers(){
    return this.http.get<User[]>(this.apiUrl);

  }

  addUser(data:any)
  {
    return this.http.post(this.apiUrl, data);
  }

  updateUser(user: User)
  {
    return this.http.put(`${this.apiUrl}/${user.id}`,user);
  }
  deleteUser(id:number)
  {
    return this.http.delete(`${this.apiUrl}/${id} `);
  }

  login(credentials: any): Observable<any>
  {
    return this.http.post('https://localhost:7079/api/User/login', credentials);
  }

  logout() {
    localStorage.removeItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'Admin';
  }

  isUser(): boolean {
    const user = this.getUser();
    return user && user.role === 'User';
  }
}
