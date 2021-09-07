import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private url = environment.api + '/';
  constructor(
    private http: HttpClient,
    private store: StorageService,
    private userService: UserService
  ) {}

  async login(username, password) {
    const url_login = this.url + 'login';
    const id_device = await this.userService.getDeviceToken();
    const { user, token } = await this.http
      .post<any>(url_login, { username, password, id_device })
      .toPromise();
    await this.store.set('id_user', user.id);
    await this.store.set('session_token', token);
  }

  async register(name, username, password) {
    const url_register = this.url + 'register';
    const id_device = await this.userService.getDeviceToken();
    return this.http
      .post<any>(url_register, { name, username, password, id_device })
      .toPromise();
  }

  async afterRegister(user, token) {
    await this.store.set('id_user', user.id);
    await this.store.set('session_token', token);
  }
  public async userLoggedIn() {
    return await this.store.get('id_user');
  }
}
