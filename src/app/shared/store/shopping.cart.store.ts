import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CartStore } from '@shared/models/cart.store.inteface';
import { Product } from '@shared/models/product.interface';

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
  withMethods(({ products, ...store }) => ({
    addToCart(product: Product) {
      patchState(store, { products: [...products(), product] });
    },
    removeFromCart(id: number) {
      const updatedProducts = products().filter((product) => product.id !== id);
      patchState(store, { products: updatedProducts });
    },
    clearCart() {
      // para no manipular el store usamos patchState
      // (valor actual, nuevo valor )
      patchState(store, initialState);
    },
  }))
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
