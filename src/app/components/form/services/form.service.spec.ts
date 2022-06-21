import { TestBed } from '@angular/core/testing';

import { FormServices } from './form.service';

describe('FormServices', () => {
  let service: FormServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
