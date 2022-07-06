import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
        providers: [Storage]
    });
    service = TestBed.inject(AuthService);
});



  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
