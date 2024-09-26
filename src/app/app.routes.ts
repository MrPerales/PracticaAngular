import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component'),
  },
  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./features/products/details/details.component'),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component'),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
  },
];
