import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ActivatedRoute } from "@angular/router";
import { meals } from "../../models/recipes.model";
import { RecipesService } from "../../services/recipes.service";

@Component({
  selector: "app-recipes-details",
  standalone: true,
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: "./recipes-details.component.html",
  styleUrl: "./recipes-details.component.scss",
})
export class RecipesDetailsComponent {
  idCategory: string | null = "";
  showLoader = false;
  noResult = false;
  receiptDetails: meals = { meals: [] };
  mealDetails: any = [];
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe((params) => {
      this.idCategory = params.get("idCategory");

      // You can now use this.categoryName as needed in your component logic
      console.log("Category Name:", this.idCategory);
      if (this.idCategory) {
        this.showLoader = true;
        this.recipesService
          .getByRecipeId(this.idCategory)
          .subscribe((mealData) => {
            if (mealData.meals.length) {
              this.extractIngredientsAndMeasures(mealData.meals[0]);
            }
          });
      }
    });
  }

  // Extract ingredients and measures

  extractIngredientsAndMeasures(mealData: any) {
    const ingredients: any = {};
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;

      if (mealData[ingredientKey] && mealData[measureKey]) {
        ingredients[mealData[ingredientKey]] = mealData[measureKey];
      }
    }

    // Create structured meal object
   
    this.mealDetails = {
      idMeal: mealData.idMeal,
      strMeal: mealData.strMeal,
      strCategory: mealData.strCategory,
      strArea: mealData.strArea,
      strInstructions: mealData.strInstructions,
      strMealThumb: mealData.strMealThumb,
      strTags: mealData.strTags,
      strYoutube: mealData.strYoutube,
      strSource: mealData.strSource,
      strImageSource: mealData.strImageSource,
      strCreativeCommonsConfirmed: mealData.strCreativeCommonsConfirmed,
      dateModified: mealData.dateModified,
      ingredients: ingredients,
    };

    this.showLoader = false;
  }

  getIngredientsArray(): any {
    // Transform ingredients object into array of key-value pairs
    return Object.entries(this.mealDetails.ingredients).map(([key, value]) => ({ key, value }));
  }
}
