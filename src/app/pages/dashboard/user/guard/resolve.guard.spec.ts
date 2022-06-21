import { TestBed } from '@angular/core/testing';

import { UserResolver } from './resolve.guard';

describe('UserResolver', () => {
  let guard: UserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserResolver);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
