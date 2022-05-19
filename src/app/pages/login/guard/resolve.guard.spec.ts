import { TestBed } from '@angular/core/testing';

import { LoginResolver } from './resolve.guard';

describe('LoginResolver', () => {
  let guard: LoginResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginResolver);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
