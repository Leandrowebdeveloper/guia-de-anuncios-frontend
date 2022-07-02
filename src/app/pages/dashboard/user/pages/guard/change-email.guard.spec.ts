import { TestBed } from '@angular/core/testing';

import { ChangeEmailGuard } from './change-email.guard';

describe('ChangeEmailGuard', () => {
  let guard: ChangeEmailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChangeEmailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
