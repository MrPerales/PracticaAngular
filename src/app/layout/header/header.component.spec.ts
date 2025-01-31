import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CartStoreSignal } from '@shared/store/shopping.cart.store';
import { provideRouter, RouterLink } from '@angular/router';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { getText, queryById } from 'app/testing';
import { By } from '@angular/platform-browser';
@Component({
  selector: 'app-cart',
  standalone: true,
  template: '<div></div>',
})
export class CartComponentMock {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  // let cartStoreSignalSpy = TestBed.inject(CartStoreSignal);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterLink, CartComponentMock],
      providers: [
        provideRouter([]),
        {
          provide: CartStoreSignal,
          useValue: {
            productsCount: () => 0,
          },
        },
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render diferents titles on the header', () => {
    const productTitle = getText(fixture, 'products-link');
    const secondTitle = getText(fixture, 'second-link');
    const thirdTitle = getText(fixture, 'third-link');
    const fourthTitle = getText(fixture, 'fourth-link');

    expect(productTitle).withContext('products').toContain('Products');
    expect(secondTitle).withContext('second').toContain('Second');
    expect(thirdTitle).withContext('third').toContain('Third');
    expect(fourthTitle).withContext('fourth').toContain('Fourth');
  });

  it('should there are 3 routerLinks', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    const routes = links.map((link) => link.injector.get(RouterLink));
    // console.log(routes);
    expect(routes.length).toEqual(3);
  });
  it('should there are 3 routerLinks and match with routes', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    const routes = links.map((link) => link.injector.get(RouterLink));
    expect(routes[0].href).toEqual('/');
    expect(routes[1].href).toEqual('/products');
    // nota se cambio el routerLink a una etiqueta <a> que encierra a <button>
    // para que detecte el nombre de la ruta "routes[2].href"
    expect(routes[2].href).toEqual('/checkout');
  });
  it('should reder the cart --incomplete', () => {
    // productCount +1

    // mocking mouseenter
    const divElement = queryById(fixture, 'show-cart-div');
    const mouseenter = new Event('mouseenter');
    divElement.nativeElement.dispatchEvent(mouseenter);

    fixture.detectChanges();

    // const text = getText(fixture, 'total');
    // expect(text).toContain('Total');
  });
});
