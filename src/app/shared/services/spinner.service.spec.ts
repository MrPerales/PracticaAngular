import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

fdescribe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should initialize isLoading to false', () => {
    expect(service.isLoading()).toBeFalse();
  });
  it('should set isLoading to true when show is called', () => {
    service.show();
    expect(service.isLoading()).toBeTrue();
  });
  it('should set isLoading to false when hide is called', () => {
    service.show();
    service.hide();
    expect(service.isLoading()).toBeFalse();
  });
});
