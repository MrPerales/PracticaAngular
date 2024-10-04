import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
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
  cartStore = inject(CartStoreSignal);
}
