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

  // nota : este metodo  es lo mismo que el de la linea 34 pero sin usar una señal
  // si no subscribiendose en el archivo en el que es llamado
  //  ejemplo en archivo details.component.ts solo descomenta el metodo de ese archivo
  getProductId(id: string) {
    const producto = this.http.get<Product>(`${this.apiUrl}/products/${id}`);
    return producto;
  }
}
