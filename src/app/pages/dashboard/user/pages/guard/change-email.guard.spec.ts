import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { ChangeEmailResolver } from './change-email.guard';

describe('ChangeEmailResolver', () => {
  let guard: ChangeEmailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule]
    });
    guard = TestBed.inject(ChangeEmailResolver);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
