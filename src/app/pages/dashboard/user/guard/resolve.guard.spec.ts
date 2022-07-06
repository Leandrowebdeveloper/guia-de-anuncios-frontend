
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { UserResolver } from './resolve.guard';

describe('UserResolver', () => {
    let guard: UserResolver;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
        });
        guard = TestBed.inject(UserResolver);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
