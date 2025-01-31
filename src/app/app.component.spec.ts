import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  template: '<div></div>',
})
export class headerComponentMock {}

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: '<div></div>',
})
export class spinnerComponentMock {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);
    await TestBed.configureTestingModule({
      imports: [AppComponent, headerComponentMock, spinnerComponentMock],
      providers: [
        provideRouter([]),
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
      // schemas: [NO_ERRORS_SCHEMA], //para ignorar los warnings de los componentes no declarados
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    toastrService = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
