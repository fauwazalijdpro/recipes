import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Category, meals } from '../models/recipes.model';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatProgressBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  meals: Category[] = [];
  loadingRandomMeal: boolean = false;
  constructor(private recipesService: RecipesService){  }

  ngOnInit(){
    this.loadingRandomMeal = true;
    this.recipesService.getRandomMeal().subscribe( result => {
      if(('meals' in result)) {
        this.meals = result.meals.map( item => {
          return {
            idCategory: item['idMeal'],
            strMeal:item['strMeal'],
            strCategory: item['strCategory'],
            strCategoryThumb: item['strMealThumb'],
            strCategoryDescription: item['strInstructions'],
          }
        })
      }
      this.loadingRandomMeal = false;
    })
  }   
}
