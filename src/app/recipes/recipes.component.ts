import { RecipesService } from './../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { categories, Category, meals } from '../models/recipes.model';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RecipeComponent } from './recipe/recipe.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    RecipeComponent,
    MatTooltipModule,
    MatIconModule,
    CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit{


  meals: Category[] = []
  searchText: string = '';


  constructor(private recipesService: RecipesService){  }

  ngOnInit(){
      this.recipesService.currentFilteredMeals.subscribe( result => {
        this.searchText = result.searchText;

        if(('meals' in result)) {
          this.meals = result.meals.meals.map( item => {
            return {
              idCategory: item['idMeal'],
              strCategory: item['strCategory'],
              strCategoryThumb: item['strMealThumb'],
              strCategoryDescription: item['strInstructions'],
            }
          })
        }
        })
      }   
}
