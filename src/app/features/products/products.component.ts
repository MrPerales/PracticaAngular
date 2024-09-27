import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductService } from '@api/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export default class ProductsComponent {
  constructor(private productService: ProductService) {}

  products = this.productService.products;
}
