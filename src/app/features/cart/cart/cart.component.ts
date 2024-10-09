import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from '@shared/models/product.interface';
import { CartStoreSignal } from '@shared/store/shopping.cart.store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  faPlus = faPlus;
  faMinus = faMinus;
  cartStore = inject(CartStoreSignal);
}
