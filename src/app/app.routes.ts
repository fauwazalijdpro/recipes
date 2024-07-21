import { Routes } from '@angular/router';
import { CategoriesDetailsComponent } from './components/categories/categories-details/categories-details.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { ListingComponent } from './components/listing/listing.component';
import { RecipesDetailsComponent } from './components/recipes/recipes-details/recipes-details.component';
import { SearchComponent } from './components/search/search.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CountryDetailsComponent } from './components/countries/country-details/country-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/details/:categoryName', component: CategoriesDetailsComponent },
    { path: 'recipe/details/:idCategory', component: RecipesDetailsComponent },    
    { path: 'listing', component: ListingComponent },
    { path: 'countries', component: CountriesComponent },
    { path: 'countries/details/:countryName', component: CountryDetailsComponent },
    
];
