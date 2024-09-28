import { Component, input, OnInit, Signal } from '@angular/core';
import { ProductService } from '@api/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export default class DetailsComponent {
  //obtenemos valor que nos manda el componente hijo
  //nota => alias es :id del router
  productId = input<number>(0, { alias: 'id' }); // esto es una signal

  faStar = faStar;
  faHeart = faHeart;
}
