import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() text: string = 'Back'; // Default text for the button
  @Input() disabled: boolean = false; // Whether the button should be disabled
  
  constructor() {}

}
