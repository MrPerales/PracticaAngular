import { environment } from ' @envs/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Product } from 'app/shared/models/product.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {
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

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
