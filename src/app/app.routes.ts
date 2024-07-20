import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { CategoriesDetailsComponent } from './categories/categories-details/categories-details.component';
import { RecipesDetailsComponent } from './recipes/recipes-details/recipes-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/details/:categoryName', component: CategoriesDetailsComponent },
    { path: 'recipe/details/:idCategory', component: RecipesDetailsComponent },
    { path: 'listing', component: ListingComponent },
];
