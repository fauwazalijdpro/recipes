import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipesService } from '../services/recipes.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[RecipesService],
      imports: [HeaderComponent,HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header with correct text and styling', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const lineUpElement = headerElement.querySelector('.line-up');

    expect(lineUpElement).toBeTruthy(); // Ensure lineUpElement is not null
    if (lineUpElement) {
      expect(lineUpElement.textContent).toContain('SIMPLE RECIPES MADE FOR');
      expect(lineUpElement.innerHTML).toContain('<em> real, actual, everyday life.</em>');
    }
  });

  it('should have the correct CSS classes applied', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const lineUpElement = headerElement.querySelector('.line-up');

    expect(headerElement.classList.contains('header')).toBe(true);
    if (lineUpElement) {
      expect(lineUpElement.classList.contains('line-up')).toBe(true);
    }
  });

});
