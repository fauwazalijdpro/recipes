import { RecipesService } from './../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { categories, Category, meals } from '../models/recipes.model';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    RecipeComponent,
    CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit{

  allCategories$: Observable<categories> = this.recipesService.getCategories();
  meals: Category[] = []
  searchText: string = '';

  constructor(private recipesService: RecipesService){  }

  ngOnInit(){
      this.recipesService.currentFilteredMeals.subscribe( result => {
        this.searchText = result.searchText;
          this.meals = result.meals.meals.map( item => {
            return {
              idCategory: item['idMeal'],
              strCategory: item['strCategory'],
              strCategoryThumb: item['strMealThumb'],
              strCategoryDescription: item['strInstructions'],
            }
          })
        })
      }
}
