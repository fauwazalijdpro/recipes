import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { categories } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service';
import { MatIconModule } from '@angular/material/icon';
import { RecipeComponent } from '../recipes/recipe/recipe.component';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatProgressBarModule,MatIconModule,RecipeComponent,CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  allCategories$: Observable<categories> = this.recipesService.getCategories();
  constructor(private recipesService: RecipesService){  }
  reverse: boolean = false;
  sortByProperty(array:any, prop:string) {
    this.reverse = !this.reverse
    array.sort((a:any, b:any) => {
      let nameA = a[prop].toLowerCase();
      let nameB = b[prop].toLowerCase();
      
      if (nameA < nameB) {
        return this.reverse ? 1 : -1; // this.Reverse order if this.reverse is true
      }
      if (nameA > nameB) {
        return this.reverse ? -1 : 1; // this.Reverse order if this.reverse is true
      }
      return 0;
    });
  }
}
