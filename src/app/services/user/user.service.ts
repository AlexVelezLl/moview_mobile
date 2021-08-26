import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/interfaces.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private url = environment.api + '/user';
  getUserById(id): Promise<User> {
    const url_user = this.url + '/' + id;
    return this.http.get<User>(url_user).toPromise();
  }
}
