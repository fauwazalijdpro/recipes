import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { RecipesService } from './../services/recipes.service';
import {MatInputModule} from '@angular/material/input';
import { Category } from '../models/recipes.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RecipeComponent } from '../recipes/recipe/recipe.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatButtonModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    RecipeComponent,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
 
  recipesService = inject(RecipesService);
  // search: FormControl<string | null> = new FormControl<string | null>(null);

  searchForm = new FormGroup({
    search: new FormControl('', { nonNullable: true })
  })
  searchText$ = this.searchForm.controls.search.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap( _item => {
      this.searchError = false;
    })
  );
  recipes$ = this.searchText$.pipe(
    filter((searchText) => searchText !== null && searchText.length > 3),
    switchMap((searchText) => {
        return this.recipesService.findRecipe(searchText);
    })
  )
  searchError: boolean = false;
  meals: Category[] = []
  searchText: string = '';

  ngOnInit(): void {

    this.recipes$.subscribe( result => {
      if(!result.meals){ 
        this.searchError = true;
        this.meals = [];
        return;
      }
      if(result.meals.length){
         this.searchText = this.searchForm.controls.search.value
         if(('meals' in result)) {
           this.meals = result.meals.map( item => {
             return {
               idCategory: item['idMeal'],
               strCategory: item['strCategory'],
               strCategoryThumb: item['strMealThumb'],
               strCategoryDescription: item['strInstructions'],
             }
           })
         }
      }
    }, _errro => {
      this.searchError = true;
      this.meals = [];
    })
  }

}
