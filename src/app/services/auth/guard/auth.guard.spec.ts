import { Storage } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let guard: AuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [Storage]
        });
        guard = TestBed.inject(AuthGuard);
    });


    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
