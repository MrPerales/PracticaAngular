import { CurrencyPipe } from '@angular/common';
import { Component, input, OnInit, Signal } from '@angular/core';
import { ProductService } from '@api/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHeart,
  faStar,
  faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FontAwesomeModule, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export default class DetailsComponent implements OnInit {
  constructor(private productService: ProductService) {}

  //obtenemos valor que nos manda el componente hijo
  //nota => alias es :id del router
  productId = input<number>(0, { alias: 'id' }); // esto es una signal
  //nota => tipamos como Signal ya que va a guardar una signal
  //en este caso la que viene de productService
  product!: Signal<Product | undefined>;
  starArray: number[] = new Array(5).fill(0);

  faStar = faStar;
  faHeart = faHeart;
  faStarHalfStroke = faStarHalfStroke;

  generateStarRate(): number {
    const rate = this.product()?.rating.rate as number;
    return Math.floor(rate);
  }

  ngOnInit(): void {
    this.product = this.productService.getProductById(this.productId());
  }
}
