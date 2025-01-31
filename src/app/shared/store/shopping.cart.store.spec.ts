import { TestBed } from '@angular/core/testing';
import { CartStoreSignal } from './shopping.cart.store';
import { generateOneProduct } from '@shared/models/products.mock';
import { ToastrService } from 'ngx-toastr';

describe('Test for CartStoreSignal', () => {
  let store: any;
  let toastrService: jasmine.SpyObj<ToastrService>;
  beforeEach(async () => {
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'info',
      'error',
    ]);
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        CartStoreSignal,
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    }).compileComponents();
    store = TestBed.inject(CartStoreSignal);
    toastrService = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
    store.clearCart();
  });
  // withComputed
  it('should create success array product ', () => {
    expect(store.products()).toEqual([]);
  });
  it('should add success a product', () => {
    const productMock = generateOneProduct();
    store.addToCart(productMock);

    const productLength = store.products().length;
    expect(productLength).toBe(1);
    expect(toastrService.success).toHaveBeenCalledWith(
      'Product added',
      'Store'
    );
  });
  // update
  it('should updateQuantityProduct', () => {
    const id = 1;
    const qty = 1;
    const newQty = 5;
    const productMock = { ...generateOneProduct(), id, qty };
    store.addToCart(productMock);

    // update
    store.updateQuantityProduct(id, newQty);

    const productQty = store.products()[0].qty; // 6 ya que le agregamos 5 mas
    expect(productQty).toBe(6);
  });
  it('should return message error when id is not found', () => {
    const id = 1;
    const idFound = 2;
    const qty = 1;
    const newQty = 5;

    const productMock = { ...generateOneProduct(), id, qty };

    store.addToCart(productMock);
    //when updateQuantityProduct id not found
    store.updateQuantityProduct(idFound, newQty);
    // when removeFromCart id not found
    store.removeFromCart(idFound);

    expect(toastrService.error)
      .withContext('updateQuantityProduct')
      .toHaveBeenCalledWith(`element with ${idFound} not found`, 'Error');
    expect(toastrService.error)
      .withContext('removeFromCart')
      .toHaveBeenCalledWith(`element with ${idFound} not found`, 'Error');
  });

  // remove
  it('should remove a product from cart', () => {
    const id = 1;
    const productMock = { ...generateOneProduct(), id };
    store.addToCart(productMock);
    const productLength = store.products().length;
    expect(productLength).toBe(1);
    expect(store.products()).toEqual([productMock]);
    // console.log(store.products());

    store.removeFromCart(id);
    expect(toastrService.info).toHaveBeenCalledWith('Product removed', 'Store');
    expect(store.products()).toEqual([]);
  });
  // clear
  it('should clear the car ', () => {
    // generateManyProducts retorna [] y addToCart recibe {}
    const productMock1 = generateOneProduct();
    const productMock2 = generateOneProduct();
    const productMock3 = generateOneProduct();
    store.addToCart(productMock1);
    store.addToCart(productMock2);
    store.addToCart(productMock3);

    // console.log(store.products());
    const productLength = store.products().length;
    expect(productLength).withContext('length').toBe(3);

    store.clearCart();
    expect(store.products()).toEqual([]);
    expect(toastrService.info).toHaveBeenCalledWith('Cart cleared', 'Store');
  });
});
