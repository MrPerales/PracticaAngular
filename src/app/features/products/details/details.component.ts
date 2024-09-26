import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export default class DetailsComponent {
  faStar = faStar;
  faHeart = faHeart;
}
