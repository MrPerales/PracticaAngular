import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor() {}
  isLoading = signal<boolean>(false);

  hide() {
    this.isLoading.set(true);
  }
  show() {
    this.isLoading.set(false);
  }
}
