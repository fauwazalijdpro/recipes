import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { RecipeComponent } from '../recipes/recipe/recipe.component';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { categories } from '../../models/recipes.model';
import { RecipesService } from '../../services/recipes.service';
import { sortByProperty } from '../../util/sort';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatProgressBarModule,MatIconModule,RecipeComponent,MatTooltipModule,CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  allCategories$: Observable<categories> = this.recipesService.getCategories();
  sortByProperty = sortByProperty;
  constructor(public recipesService: RecipesService){  }
  reverse: boolean = false;
  pageTitle = "Categories";
}
