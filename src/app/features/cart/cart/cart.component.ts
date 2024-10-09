import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from '@shared/models/product.interface';
import { CartStoreSignal } from '@shared/store/shopping.cart.store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, CurrencyPipe, SlicePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartStore = inject(CartStoreSignal);
  product = input.required<Product>();

  faPlus = faPlus;
  faMinus = faMinus;

  plusItem(id: number) {
    const countPlus: number = 1;
    this.cartStore.updateQuantityProduct(id, countPlus);
  }
  minumItem(id: number) {
    const countMinum: number = -1;
    this.cartStore.updateQuantityProduct(id, countMinum);
  }
}
