import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let storage: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [Storage]
    });
    service = TestBed.inject(StorageService);
    storage = TestBed.inject(Storage);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
