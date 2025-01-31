import { ComponentFixture, TestBed } from '@angular/core/testing';
import CheckoutComponent from './checkout.component';
import { CartStoreSignal } from '@shared/store/shopping.cart.store';
import { ToastrService } from 'ngx-toastr';
import { clickElement, getText } from 'app/testing';
import { generateOneProduct } from '@shared/models/products.mock';

describe('Test for Checkout Component ', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let store: any;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'info',
      'error',
    ]);
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        CartStoreSignal,
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(CartStoreSignal);
    toastrService = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
    store.clearCart();
    // agregamos un producto para poder testar los botones dentro del for
    const id = 1;
    const qty = 2;
    const title = 'product 1';
    const price = 10000;
    const productMock = { ...generateOneProduct(), id, qty, title, price };
    store.addToCart(productMock);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the title', () => {
    const title = getText(fixture, 'checkout-title');
    expect(title).toContain('My Cart');
  });
  it('should change text "item" to "items" when the quantity is greater than 1', () => {
    // const InitialQuantity = getText(fixture, 'items-count');
    // expect(InitialQuantity).toContain('1 - item');

    const productMock = { ...generateOneProduct(), qty: 2 };
    store.addToCart(productMock);

    fixture.detectChanges();

    const finalQuantity = getText(fixture, 'items-count');
    expect(finalQuantity).toContain('4 - items'); //4 items ya que en el beforeEch se agrego 1
  });
  it('should call the method clearAll when the button is clicked', () => {
    spyOn(component, 'clearAll');
    clickElement(fixture, 'btn-clear-all', true);
    fixture.detectChanges();
    expect(component.clearAll).toHaveBeenCalled();
  });
  it('should call the method plusItem when the button is clicked', () => {
    spyOn(component, 'plusItem');
    clickElement(fixture, 'btn-plus-item', true);
    fixture.detectChanges();
    expect(component.plusItem).toHaveBeenCalledWith(1); //id del producto en el beforeEch
  });
  it('should call the method minumItem when the button is clicked', () => {
    spyOn(component, 'minumItem');
    clickElement(fixture, 'btn-minum-item', true);
    fixture.detectChanges();
    expect(component.minumItem).toHaveBeenCalledOnceWith(1);
  });
  it('should call the method removeItem when the btn is clicked', () => {
    spyOn(component, 'removeItem');
    clickElement(fixture, 'btn-remove-item', true);
    fixture.detectChanges();
    expect(component.removeItem).toHaveBeenCalledWith(1);
  });
  it('should render the product title', () => {
    const title = getText(fixture, 'product-title');
    expect(title).toContain('product 1');
  });
});
