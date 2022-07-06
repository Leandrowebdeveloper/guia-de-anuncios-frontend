import { Storage } from '@ionic/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SystemAccessPage } from './system-access.page';
import { RegisterService } from './services/register/register.service';
import { RecoverService } from './services/recover/recover.service';
import { LoginService } from './services/login/login.service';
import { SystemAccessService } from './services/system-access.service';
import { SystemAccessResolver } from './guard/resolve.guard';
import { ButtonsAccessComponent } from './components/buttons/buttons-sccess-component';

describe('SystemAccessPage, ButtonsAccessComponent', () => {
    let component: SystemAccessPage;
    let fixture: ComponentFixture<SystemAccessPage>;

    let componentButton: ButtonsAccessComponent;
    let fixtureButton: ComponentFixture<ButtonsAccessComponent>;

    let systemAccessService: SystemAccessService;
    let recoverService: RecoverService;
    let registerService: RegisterService;
    let loginService: LoginService;
    let guard: SystemAccessResolver;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SystemAccessPage, ButtonsAccessComponent],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                Storage,
                SystemAccessService,
                LoginService,
                RegisterService,
                RecoverService,
                SystemAccessResolver,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SystemAccessPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

        fixtureButton = TestBed.createComponent(ButtonsAccessComponent);
        componentButton = fixtureButton.componentInstance;
        fixtureButton.detectChanges();
    }));

    beforeEach(() => {
        registerService = TestBed.inject(RegisterService);
        recoverService = TestBed.inject(RecoverService);
        loginService = TestBed.inject(LoginService);
        systemAccessService = TestBed.inject(SystemAccessService);
        guard = TestBed.inject(SystemAccessResolver);
    });

    it('should create componentButton', () => {
        expect(componentButton).toBeTruthy();
      });

    it('should be created', () => {
        expect(recoverService).toBeTruthy();
    });

    it('should be created', () => {
        expect(recoverService).toBeTruthy();
    });

    it('should be created', () => {
        expect(loginService).toBeTruthy();
    });

    it('should be created', () => {
        expect(systemAccessService).toBeTruthy();
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
