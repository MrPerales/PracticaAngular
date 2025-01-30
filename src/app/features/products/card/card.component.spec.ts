import { Component } from '@angular/core';
import { CardComponent } from './card.component';
import { generateOneProduct } from '@shared/models/products.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { clickElement, getText } from 'app/testing';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [CardComponent],
  template: `<app-card [product]="product"></app-card>`,
})
class HostComponent {
  // realmente no se necesita testear el input ,
  //  mientras le asignamos un valor ('mock')
  // product = input.required<Product>();
  product = {
    id: 1,
    title: 'product 1',
    price: 10000,
    category: 'Electronics',
    description:
      'Ergonomic Table made with Granite for all-day rectangular support',
    image: 'https://loremflickr.com/3788/547?lock=7776956764330230',
    qty: 2,
    subTotal: 0,
    rating: { rate: 1, count: 3 },
  };
  // product = { ...generateOneProduct(), price: 10, title: 'product 1' };
}

fdescribe('Test for CardComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let cardComponent: CardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, HostComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    // para poder llamar la funcion AddToCart
    const debugElement = fixture.debugElement.query(
      By.directive(CardComponent)
    );
    cardComponent = debugElement.componentInstance;
    fixture.detectChanges();
  });
  it('should crate', () => {
    expect(component).toBeTruthy();
  });
  it('should render the product', () => {
    const title = getText(fixture, 'product-title-card');
    const category = getText(fixture, 'category');
    const lernMore = getText(fixture, 'learn-more');
    expect(title).toContain('product 1');
    expect(category).toContain('Electronics');
    expect(lernMore).toContain('Learn');
  });
  it('should call addToCart when is clicked', () => {
    spyOn(cardComponent, 'AddToCart');
    clickElement(fixture, 'bnt-add-to-cart', true);
    fixture.detectChanges();
    expect(cardComponent.AddToCart).toHaveBeenCalled();
  });
  // test for @output
  it('emmit product when button is clicked', () => {
    // spiamos el metodo emit
    spyOn(cardComponent.addToCartEvent, 'emit');
    clickElement(fixture, 'bnt-add-to-cart', true);
    // esperamos que el producto sea emitido correctamente
    expect(cardComponent.addToCartEvent.emit).toHaveBeenCalledWith(
      component.product
    );
  });
});
