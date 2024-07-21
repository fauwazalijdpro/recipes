
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from '../../recipes/recipe/recipe.component';
import { Category } from '../../../models/recipes.model';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'app-categories-details',
  standalone: true,
  imports: [MatProgressBarModule,CommonModule,RecipeComponent],
  templateUrl: './categories-details.component.html',
  styleUrl: './categories-details.component.scss'
})
export class CategoriesDetailsComponent {
  categoryName: string|null ='';
  noResult = false;
  showLoader = false;
  categories:Category[] = [];
  constructor(private route: ActivatedRoute, private recipesService: RecipesService) { }
  
  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName');
      
      // You can now use this.categoryName as needed in your component logic
      console.log('Category Name:', this.categoryName);
      if(this.categoryName){
        this.showLoader = true;
        this.recipesService.getByCateory(this.categoryName).subscribe(result => {
          if(result.meals == null) {
            this.noResult= true;
            this.showLoader = false;
            return;
          }
          result.meals.forEach(meal => {
            this.categories.push({
              idCategory: meal['idMeal'],
              strMeal: meal['strMeal'],
              strCategory: this.categoryName,
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
