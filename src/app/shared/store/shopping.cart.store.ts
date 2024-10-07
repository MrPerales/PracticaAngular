import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CartStore } from '@shared/models/cart.store.inteface';
import { Product } from '@shared/models/product.interface';
import { ToastrService } from 'ngx-toastr';

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CartStoreSignal = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // para operaciones del cart
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductCount(products())),
    totalAmount: computed(() => calculateTotalAmount(products())),
  })),
  // metodos para el cart
  withMethods(
    ({ products, ...store }, toastrService = inject(ToastrService)) => ({
      addToCart(product: Product) {
        // ya se agrego ese producto
        const isProductInCart = products().find(
          (item) => item.id === product.id
        );
        if (isProductInCart) {
          isProductInCart.qty++;
          isProductInCart.subTotal =
            isProductInCart.qty * isProductInCart.price;
          patchState(store, { products: [...products()] });
        } else {
          patchState(store, { products: [...products(), product] });
        }
        toastrService.success('Product added', 'Store');
      },
      updateQuantityProduct(id: number, count: number) {
        const product = products().find((item) => item.id === id);
        if (product) {
          product.qty = product.qty + count;
          patchState(store, { products: [...products()] });
        }
      },
      removeFromCart(id: number) {
        const updatedProducts = products().filter(
          (product) => product.id !== id
        );
        patchState(store, { products: updatedProducts });
        toastrService.info('Product removed', 'Store');
      },
      clearCart() {
        // para no manipular el store usamos patchState
        // (valor actual, nuevo valor )
        patchState(store, initialState);
        toastrService.info('Cart cleared', 'Store');
      },
    })
  )
);
function calculateTotalAmount(products: Product[]): number {
  return products.reduce(
    (accumulador, product) => accumulador + product.price * product.qty,
    0
  );
}
function calculateProductCount(products: Product[]): number {
  return products.reduce(
    (accumulador, product) => accumulador + product.qty,
    0
  );
}
