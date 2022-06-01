import { TestBed } from '@angular/core/testing';

import { RedefinePasswordService } from './redefine-password.service';

describe('RedefinePasswordService', () => {
  let service: RedefinePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedefinePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
