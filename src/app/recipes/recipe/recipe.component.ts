import { Component, Input } from '@angular/core';
import { Category } from '../../models/recipes.model';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [TruncatePipe,MatButtonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

  @Input() item: Category = {
    idCategory: '',
    strCategory: '',
    strCategoryThumb: '',
    strCategoryDescription: ''
  }
  
}
