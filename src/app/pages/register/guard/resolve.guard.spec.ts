import { TestBed } from '@angular/core/testing';

import { RegisterResolver } from './resolve.guard';

describe('RegisterResolver', () => {
  let guard: RegisterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegisterResolver);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
