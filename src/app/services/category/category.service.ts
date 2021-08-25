import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/interfaces.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.api + '/category';

  constructor(private http: HttpClient) {}

  getCategories(): Promise<Category[]> {
    return this.http
      .get<Category[]>(this.url)
      .pipe(
        map((category) =>
          category.map((cat) => {
            cat.icon = environment.api + cat.icon;
            return cat;
          })
        )
      )
      .toPromise();
  }
}
