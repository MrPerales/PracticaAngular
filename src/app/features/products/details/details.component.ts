import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  Component,
  inject,
  Input,
  input,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { ProductService } from '@api/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHeart,
  faStar,
  faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from '@shared/models/product.interface';
import { CartStoreSignal } from '@shared/store/shopping.cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FontAwesomeModule, CurrencyPipe, CommonModule],
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

  //descomentar si usas el metodo getProductId de este archivo
  // productoId = signal<Product | undefined>(undefined);
  cartStoreSignal = inject(CartStoreSignal);

  faStar = faStar;
  faHeart = faHeart;
  faStarHalfStroke = faStarHalfStroke;

  generateStarRate(): number {
    const rate = this.product()?.rating.rate as number;
    return Math.floor(rate);
  }
  addToCart() {
    this.cartStoreSignal.addToCart(this.product() as Product);
  }
  ngOnInit() {
    this.product = this.productService.getProductById(this.productId());
    // this.getProductoId();
  }

  // nota: descomenta el metodo  si vas a usar el metodo de getProductId de productService
  // nota : este metodo hace lo mismo que la linea 42
  // pero sin modificar el metodo del archivo productService
  //   getProductoId() {
  //     if (this.productId()) {
  //       this.productService.getProductId(this.productId().toString()).subscribe({
  //         next: (data) => {
  //           this.productoId.set(data);
  //         },
  //         error: (error) => console.log(error),
  //       });
  //     }
  //   }
}
