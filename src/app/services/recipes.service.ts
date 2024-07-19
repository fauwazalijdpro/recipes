import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { categories, Meal, meals } from '../models/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private filteredMeals = new BehaviorSubject<{meals:meals,searchText:string}>({} as any);
  currentFilteredMeals = this.filteredMeals.asObservable();
  
  updateSearch(meals: meals,searchText:string) {
    this.filteredMeals.next({meals,searchText});
  }

  private API_URL= environment.API_URL;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<categories> {
    return this.http.get<categories>(this.API_URL+'categories.php')
  }
  
  findRecipe(searchText: string): Observable<meals> {
    return this.http.get<meals>(this.API_URL+'search.php?s='+searchText)
    
  }
}
