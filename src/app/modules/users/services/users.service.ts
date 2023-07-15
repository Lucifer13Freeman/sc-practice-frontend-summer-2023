import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsersData(): Observable<any> {
    return this.http.get(`http://localhost:8000/users`);
  }

  lockUser(message: string) {
    console.log(message);
    return this.http.post(`http://localhost:8000/users`, { message });
  }

  deleteUser(id: number) {
    console.log(id);
    return this.http.delete(`http://localhost:8000/users/${id}`);
  }
}
