import { provideRouter, RouterLink } from '@angular/router';
import NotFoundComponent from './not-found.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getText } from 'app/testing';
import { By } from '@angular/platform-browser';

fdescribe('Test for notFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, RouterLink],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show correct text', () => {
    const message = getText(fixture, 'message');
    const messageError = getText(fixture, 'message-error');
    const btnMessage = getText(fixture, 'btn-message');
    expect(message).toContain('Oops');
    expect(messageError).toContain("We can't");
    expect(btnMessage).toContain('Go to Home');
  });
  it('should there are 1 routerLinks and match with routes', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    const routes = links.map((link) => link.injector.get(RouterLink));
    expect(routes.length).toEqual(1);
    expect(routes[0].href).toEqual('/products');
  });
});
