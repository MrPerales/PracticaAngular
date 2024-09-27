import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule, SlicePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  // obtenemos el producto desde el componente padre
  // es una signal
  product = input.required<Product>();

  faEye = faEye;
  faArrowRight = faArrowRight;
}
