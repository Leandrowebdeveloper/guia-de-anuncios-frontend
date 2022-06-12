import { TestBed } from '@angular/core/testing';

import { RedefinePasswordResolver } from './resolve.guard';

describe('RedefinePasswordResolver', () => {
  let guard: RedefinePasswordResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedefinePasswordResolver);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
