import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faShop } from '@fortawesome/free-solid-svg-icons';
import { CartStoreSignal } from '@shared/store/shopping.cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgClass, CurrencyPipe, SlicePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor() {}
  cartStoreSignal = inject(CartStoreSignal);
  showCart = signal<boolean>(false);
  fashop = faShop;
  faCartShopping = faCartShopping;
}
