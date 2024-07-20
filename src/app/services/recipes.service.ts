import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { categories, Meal, meals } from '../models/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {



  private API_URL= environment.API_URL;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<categories> {
    return this.http.get<categories>(this.API_URL+'categories.php')
  }

  getByLetter(letter: string): Observable<meals> {
    return this.http.get<meals>(this.API_URL+'search.php?f='+letter)
  }

  getRandomMeal(): Observable<meals> {
    return this.http.get<meals>(this.API_URL+'random.php')
  }
  
  findRecipe(searchText: string): Observable<meals> {
    return this.http.get<meals>(this.API_URL+'search.php?s='+searchText)    
  }

  getByCateory(letter:string): Observable<meals> {
    return this.http.get<meals>(this.API_URL+'filter.php?c='+letter)
  }

  getByRecipeId(id:string): Observable<meals> {
    return this.http.get<meals>(this.API_URL+'lookup.php?i='+id)
  }
}
