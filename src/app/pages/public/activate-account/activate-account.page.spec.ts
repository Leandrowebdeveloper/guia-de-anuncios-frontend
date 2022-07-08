import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivateAccountPage } from './activate-account.page';
import { ActivateAccountResolver } from './guard/resolve.guard';
import { ActivateAccountService } from './services/activate-account.service';
import { HeaderComponentModule } from 'src/app/header/header.component.module';
import { HeaderComponent } from 'src/app/header/header.component';

describe('ActivateAccountPage, ActivateAccountResolver', () => {
    let component: ActivateAccountPage;
    let fixture: ComponentFixture<ActivateAccountPage>;

    let headerComponent: HeaderComponent;
    let headerComponentFixture: ComponentFixture<HeaderComponent>;

    let guard: ActivateAccountResolver;
    let service: ActivateAccountService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ActivateAccountPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                HeaderComponentModule,
            ],
            providers: [ActivateAccountResolver, ActivateAccountService],
        }).compileComponents();

        fixture = TestBed.createComponent(ActivateAccountPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

        headerComponentFixture = TestBed.createComponent(HeaderComponent);
        headerComponent = headerComponentFixture.componentInstance;
        headerComponentFixture.detectChanges();
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

    it('should create headerComponent', () => {
        expect(headerComponent).toBeTruthy();
    });
});
