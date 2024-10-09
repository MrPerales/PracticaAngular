import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '@shared/services/spinner.service';
import { finalize } from 'rxjs';

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinerService = inject(SpinnerService);
  spinerService.show();
  return next(req).pipe(finalize(() => spinerService.hide()));
};
