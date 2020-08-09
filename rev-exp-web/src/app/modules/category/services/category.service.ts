import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { CategoryModel } from '../../../models/categoy.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly baseURL = environment.api + "/category/";

  constructor(private http: HttpClient) { }

  // Get all categories
  getAll(){
    return this.http.get(this.baseURL);
  }

  // Delete a category
  async delete(id: string){
    this.http.delete(this.baseURL + id).pipe(map(x => {
      return x;
    })).toPromise()
  }

  // Create a category
  create(category: CategoryModel){
    return this.http.post(this.baseURL, category).pipe(map(x => x)).toPromise();
  }

  // Update a category
  update(category: CategoryModel){
    return this.http.put(this.baseURL + category._id, category).pipe(map(x => x)).toPromise();
  }

}
