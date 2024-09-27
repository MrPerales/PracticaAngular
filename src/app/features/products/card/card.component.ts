import { SlicePipe } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faCartShopping,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule, SlicePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  // obtenemos el producto desde el componente padre
  // es una signal
  product = input.required<Product>();
  // mandar datos al padre
  @Output() addToCartEvent = new EventEmitter<Product>();

  faEye = faEye;
  faArrowRight = faArrowRight;
  faCartShopping = faCartShopping;

  AddToCart(): void {
    this.addToCartEvent.emit(this.product());
  }
}
