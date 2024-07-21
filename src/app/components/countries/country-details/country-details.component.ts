import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../models/recipes.model';
import { RecipesService } from '../../../services/recipes.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RecipeComponent } from '../../recipes/recipe/recipe.component';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports:[MatProgressBarModule,CommonModule,RecipeComponent],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent {
  countryName: string|null ='';
  noResult = false;
  showLoader = false;
  categories:Category[] = [];
  constructor(private route: ActivatedRoute, private recipesService: RecipesService) { }
  
  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      this.countryName = params.get('countryName');
      
      // You can now use this.countryName as needed in your component logic
      console.log('Category Name:', this.countryName);
      if(this.countryName){
        this.showLoader = true;
        this.recipesService.getByCountry(this.countryName).subscribe(result => {
          if(result.meals == null) {
            this.noResult= true;
            this.showLoader = false;
            return;
          }
          result.meals.forEach(meal => {
            this.categories.push({
              idCategory: meal['idMeal'],
              strMeal: meal['strMeal'],
              strCategory: this.countryName,
              strCategoryThumb: meal['strMealThumb'],
              strCategoryDescription: '',
            });
          });
          this.showLoader = false;
        });
      }
    });
  }
}
