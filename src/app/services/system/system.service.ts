import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private url = environment.api + '/';
  constructor(private http: HttpClient, private store: StorageService) {}

  async login(username, password) {
    const url_login = this.url + 'login';
    const { user, token } = await this.http
      .post<any>(url_login, { username, password })
      .toPromise();
    await this.store.set('id_user', user.id);
    await this.store.set('session_token', token);
  }

  register(name, username, password) {
    const url_register = this.url + 'register';
    return this.http
      .post<any>(url_register, { name, username, password })
      .toPromise();
  }

  async afterRegister(user, token) {
    await this.store.set('id_user', user.id);
    await this.store.set('session_token', token);
  }
}
