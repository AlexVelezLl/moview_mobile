import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/interfaces.model';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.api + '/user';
  private TOKEN_KEY = 'session_token';

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) {}

  getUserById(id: number): Promise<User> {
    const url_user = this.url + '/' + id;
    return this.http.get<User>(url_user).toPromise();
  }

  getSessionToken() {
    return this.storage.get(this.TOKEN_KEY);
  }

  async logout() {
    await this.storage.remove(this.TOKEN_KEY);
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
