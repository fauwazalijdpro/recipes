import { CommonModule } from '@angular/common';
import { meals } from './../models/recipes.model';
import { RecipesService } from './../services/recipes.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { debounce, debounceTime, distinctUntilChanged, filter, of, pipe, shareReplay, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
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
    tap( item => {
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

  ngOnInit(): void {

    this.recipes$.subscribe( result => {
      debugger
      if(!result.meals){ 
        this.searchError = true;
        return;
      }
      if(result.meals.length){
         this.recipesService.updateSearch(result,this.searchForm.controls.search.value);
      }
    })
  }

}
