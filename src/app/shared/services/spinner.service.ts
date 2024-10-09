import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor() {}
  isLoading = signal<boolean>(false);

  hide() {
    this.isLoading.set(false);
  }
  show() {
    this.isLoading.set(true);
  }
}
