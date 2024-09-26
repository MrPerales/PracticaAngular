import { environment } from ' @envs/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {
    this.getProducts();
  }
  apiUrl = environment.API_URL;
  products = signal<any[]>([]);

  getProducts() {
    return this.http
      .get<any[]>(`${this.apiUrl}/products`)
      .pipe(tap((data: any[]) => this.products.set(data)))
      .subscribe();
  }

  getProductById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
