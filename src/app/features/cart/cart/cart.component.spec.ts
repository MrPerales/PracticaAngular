import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartStoreSignal } from '@shared/store/shopping.cart.store';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { generateOneProduct } from '@shared/models/products.mock';
import { clickElement, getText, queryById } from 'app/testing';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [CartComponent],
  template: `<app-cart [product]="product"></app-cart>`,
})
class HostComponent {
  // realmente no se necesita testear el input ,
  //  mientras le asignamos un valor ('mock')
  // product = input.required<Product>();
  product = { ...generateOneProduct(), price: 10, title: 'product 1' }; //es lo mismo de arriba para el test
}

describe('Test for CartComponent ', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let cartComponent: CartComponent;
  let store: any;
  let toastrService: jasmine.SpyObj<ToastrService>;
  beforeEach(async () => {
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'info',
      'error',
    ]);
    await TestBed.configureTestingModule({
      imports: [CartComponent, HostComponent],
      providers: [
        CartStoreSignal,
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(CartStoreSignal);
    toastrService = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy;
  });
  it('should render the product', () => {
    const title = getText(fixture, 'product-title');
    const price = getText(fixture, 'product-price');
    expect(price).toContain(10);
    expect(title).toContain('product 1');

    component.product = {
      ...generateOneProduct(),
      price: 2,
      title: 'product 2',
    };
    fixture.detectChanges();
    const title2 = getText(fixture, 'product-title');
    const price2 = getText(fixture, 'product-price');
    expect(title2).withContext('product 2').toContain('product 2');
    expect(price2).withContext('product 2').toContain(2);
  });
  it('should call plusQuantity product when is clicked', () => {
    // agregamos como directiva al componente para poder usar sus metodos que contiene
    const debugElement = fixture.debugElement.query(
      By.directive(CartComponent)
    );
    cartComponent = debugElement.componentInstance;
    // console.log(component.product);

    const qty = 25;
    const id = 1;
    component.product = { ...generateOneProduct(), qty, id };
    spyOn(cartComponent, 'plusItem'); //spiamos los metodos
    fixture.detectChanges();

    clickElement(fixture, 'btn-plus', true);
    fixture.detectChanges();

    expect(cartComponent.plusItem).toHaveBeenCalledWith(id);
  });
  it('should call minumQuantity product when is clicked', () => {
    const debugElement = fixture.debugElement.query(
      By.directive(CartComponent)
    );
    cartComponent = debugElement.componentInstance;
    // console.log(component.product);

    const qty = 10;
    const id = 1;
    component.product = { ...generateOneProduct(), qty, id };
    spyOn(cartComponent, 'minumItem'); //spiamos los metodos
    fixture.detectChanges();

    clickElement(fixture, 'btn-minum', true);
    fixture.detectChanges();

    expect(cartComponent.minumItem).toHaveBeenCalledWith(id);
  });
});
