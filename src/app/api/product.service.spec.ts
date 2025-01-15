import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { generateManyProducts } from '@shared/models/products.mock';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';

fdescribe('ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // varificamos si esta montado el mockData correctamente
    httpController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe(' test for getProducts', () => {
    it('should return a product List ', (doneFn) => {
      // arrange
      const mockData: Product[] = generateManyProducts(5);

      // act
      service.getProducts().subscribe({
        next: (data) => {
          expect(data.length).toEqual(mockData.length);
          expect(data).toEqual(
            mockData.map((product) => ({ ...product, qty: 1 })) //solo para que los qty sean 1
          );
          doneFn();
        },
      });

      // assert

      // expect(products).toEqual(mockData);
      // http config
      const url = `${environment.API_URL}/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  });
});
