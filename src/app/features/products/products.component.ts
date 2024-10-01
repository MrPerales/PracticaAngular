import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductService } from '@api/product.service';
import { CartStoreSignal } from '@shared/store/shopping.cart.store';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export default class ProductsComponent {
  constructor(private productService: ProductService) {}
  cartStoreSiganl = inject(CartStoreSignal);

  products = this.productService.products;

  addToCart(product: Product) {
    this.cartStoreSiganl.addToCart(product);
  }
}
