import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleXmark,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { CartStoreSignal } from '@shared/store/shopping.cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe, FontAwesomeModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export default class CheckoutComponent {
  faCircleXMark = faCircleXmark;
  faPlus = faPlus;
  faMinus = faMinus;

  cartStore = inject(CartStoreSignal);

  removeItem(id: number) {
    this.cartStore.removeFromCart(id);
  }
  plusItem(id: number) {
    const countPlus: number = 1;
    this.cartStore.updateQuantityProduct(id, countPlus);
  }
  minumItem(id: number) {
    const countMinum: number = -1;
    this.cartStore.updateQuantityProduct(id, countMinum);
  }
  clearAll() {
    this.cartStore.clearCart();
  }
}
