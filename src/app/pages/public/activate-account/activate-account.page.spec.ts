import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivateAccountPage } from './activate-account.page';
import { ActivateAccountResolver } from './guard/resolve.guard';
import { ActivateAccountService } from './services/activate-account.service';

describe('ActivateAccountPage, ActivateAccountResolver', () => {
    let component: ActivateAccountPage;
    let fixture: ComponentFixture<ActivateAccountPage>;



    let guard: ActivateAccountResolver;
    let service: ActivateAccountService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ActivateAccountPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [ActivateAccountResolver, ActivateAccountService],
        }).compileComponents();

        fixture = TestBed.createComponent(ActivateAccountPage);
        component = fixture.componentInstance;
        fixture.detectChanges();


    }));

    beforeEach(() => {
        guard = TestBed.inject(ActivateAccountResolver);
        service = TestBed.inject(ActivateAccountService);
    });

    it('should be created service', () => {
        expect(service).toBeTruthy();
    });

    it('should be created guard', () => {
        expect(guard).toBeTruthy();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });


});
