import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { adminLoadGuard } from './admin-load.guard';

describe('adminLoadGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminLoadGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
