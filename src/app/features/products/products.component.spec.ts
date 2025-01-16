import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import ProductsComponent from './products.component';
import { ProductService } from '@api/product.service';
import { generateManyProducts } from '@shared/models/products.mock';
import { of } from 'rxjs';
import { CartStoreSignal } from '@shared/store/shopping.cart.store';
import { provideRouter } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { queryById } from 'app/testing';

fdescribe('ProductsComponent', () => {
  let productsComponent: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);
    // const cartStoreSignal = TestBed.inject(CartStoreSignal);
    // const cartStoreSignalSpy = spyOn(cartStoreSignal, 'addToCart');
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideRouter([]),
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartStoreSignal, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductsComponent);
    productsComponent = fixture.componentInstance;
    productService = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    const productsMock = generateManyProducts(9);
    productService.getProducts.and.returnValue(of(productsMock));

    fixture.detectChanges(); //ngOnInit
  });

  it('should create', () => {
    expect(productsComponent).toBeTruthy();
  });
  // it('should add product to cart ', () => {
  //   const element = queryById(fixture, 'btn');
  //   console.log(element);

  //   // cartStoreSignal config
  //   const cartStore = TestBed.inject(CartStoreSignal);
  //   const addToCartSpy = jasmine.createSpyObj('CartStoreSignal', ['addToCart']);
  //   spyOn(cartStore, 'addToCart').and.callThrough();

  //   //
  // });
  // it('should change the status "loading"=> "success"',()=>{})
});
