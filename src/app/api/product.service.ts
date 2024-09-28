import { environment } from '@envs/environment.development';
import { HttpClient } from '@angular/common/http';
import {
  EnvironmentInjector,
  Injectable,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private environmentInjector: EnvironmentInjector
  ) {
    this.getProducts();
  }
  apiUrl = environment.API_URL;
  products = signal<Product[]>([]);

  getProducts() {
    return this.http
      .get<Product[]>(`${this.apiUrl}/products`)
      .pipe(tap((data: Product[]) => this.products.set(data)))
      .subscribe();
  }

  // nota : toSignal es para comvertir un observable a una signal
  getProductById(id: number) {
    // retorna una signal para poder usarla
    return runInInjectionContext(this.environmentInjector, () =>
      toSignal<Product>(this.http.get<Product>(`${this.apiUrl}/products/${id}`))
    );
  }
}
