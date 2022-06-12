import { TestBed } from '@angular/core/testing';

import { SystemAccessService } from './system-access.service';

describe('SystemAccessService', () => {
  let service: SystemAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
