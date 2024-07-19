import { RecipesService } from './../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { categories } from '../models/recipes.model';
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
  constructor(private recipesService: RecipesService){  }

  ngOnInit(){
      
  }
}
