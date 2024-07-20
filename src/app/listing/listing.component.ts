import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RecipeComponent } from '../recipes/recipe/recipe.component';
import { CategoriesComponent } from '../categories/categories.component';
import { map, Observable, tap } from 'rxjs';
import { categories, Category } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service';
import { sortByProperty } from '../util/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [MatProgressBarModule,MatIconModule,RecipeComponent,CommonModule,MatTooltipModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent implements OnInit{
  //  allCategories$: Observable<categories> = 
  categories:Category[] = [];
  sortByProperty = sortByProperty;
  reverse: boolean = false;
  selectedLetter = 'A';
  showLoader: boolean =  false;
  noResult: boolean  =  false;
  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(public recipesService: RecipesService){
  }
  ngOnInit(): void {
    this.getDetailsByAlpha(this.selectedLetter);
  }
  private getDetailsByAlpha(selectedLetter:string) {
    this.showLoader = true;
    this.categories= [];
    this.noResult= false;
    this.recipesService.getByLetter(selectedLetter).subscribe(result => {
      if(result.meals == null) {
        this.noResult= true;
        this.showLoader = false;
        return;
      }
      result.meals.forEach(meal => {
        this.categories.push({
          idCategory: meal['idMeal'],
          strMeal: meal['strMeal'],
          strCategory: meal['strCategory'],
          strCategoryThumb: meal['strMealThumb'],
          strCategoryDescription: meal['strInstructions'],
        });
      });
      this.showLoader = false;
    });
  }

  getByAlpha(letter: string){
    this.selectedLetter = letter;
    this.getDetailsByAlpha(this.selectedLetter)
  }
}
