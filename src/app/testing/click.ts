import { ComponentFixture } from '@angular/core/testing';
import { query, queryById } from './finders';

export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false
) {
  let debugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const element: HTMLElement = debugElement.nativeElement;
  element.click();
}
