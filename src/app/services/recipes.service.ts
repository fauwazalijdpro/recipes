import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { categories } from '../models/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private API_URL= environment.API_URL;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<categories> {
    return this.http.get<categories>(this.API_URL+'categories.php')
  }
}
