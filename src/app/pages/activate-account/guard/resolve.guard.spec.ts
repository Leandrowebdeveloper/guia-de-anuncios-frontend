import { TestBed } from '@angular/core/testing';

import { ActivateAccountResolver } from './resolve.guard';

describe('ActivateAccountResolver', () => {
  let guard: ActivateAccountResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivateAccountResolver);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
