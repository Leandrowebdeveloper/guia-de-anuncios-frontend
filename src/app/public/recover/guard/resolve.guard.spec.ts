import { TestBed } from '@angular/core/testing';

import { RecoverResolver } from './resolve.guard';

describe('RecoverResolver', () => {
  let guard: RecoverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecoverResolver);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
