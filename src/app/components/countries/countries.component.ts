import { Component } from '@angular/core';
import { countries, country, meals } from '../../models/recipes.model';
import { RecipesService } from '../../services/recipes.service';
import { Observable } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { flagUrls } from '../../util/flags';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [MatProgressBar,MatIconModule,CommonModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {
  flags = flagUrls;
  allCountries$: Observable<countries> = this.recipesService.getCountries();
  constructor(private router: Router,public recipesService: RecipesService){  }

  getFlag(country: string){
    return this.flags[country]
  }

  getCountriesMeals(item:country){
    console.log(item)
    this.router.navigateByUrl('/countries/details/'+item.strArea);
  }
}
