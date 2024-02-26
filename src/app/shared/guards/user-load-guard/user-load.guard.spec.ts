import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { userLoadGuard } from './user-load.guard';

describe('userLoadGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userLoadGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
