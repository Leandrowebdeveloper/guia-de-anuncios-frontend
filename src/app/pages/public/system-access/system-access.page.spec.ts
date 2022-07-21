import { Storage } from '@ionic/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SystemAccessPage } from './system-access.page';
import { RecoverService } from './services/recover/recover.service';
import { LoginService } from './services/login/login.service';
import { SystemAccessService } from './services/system-access.service';
import { SystemAccessResolver } from './guard/resolve.guard';
import { ButtonsAccessComponent } from './components/buttons/buttons-sccess-component';
import { RegisterService } from './services/register/register.service';
import { RequisitionLimitComponent } from '../../../components/requisitionLimit/requisition-limit.component';

import { FormComponentModule } from 'src/app/components/form/form.module';
import { SystemAccessAdminResolver } from '../system-access-admin/guard/resolve.guard';

describe('SystemAccessPage', () => {
    let component: SystemAccessPage;
    let fixture: ComponentFixture<SystemAccessPage>;

    let buttonsAccessComponent: ButtonsAccessComponent;
    let buttonsAccessComponentFixture: ComponentFixture<ButtonsAccessComponent>;


    let registerService: RegisterService;
    let systemAccessService: SystemAccessService;
    let recoverService: RecoverService;
    let loginService: LoginService;
    let guard: SystemAccessResolver;



    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                SystemAccessPage,
                ButtonsAccessComponent,
            ],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                FormComponentModule,
                SystemAccessAdminResolver
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


        buttonsAccessComponentFixture = TestBed.createComponent(ButtonsAccessComponent);
        buttonsAccessComponent = buttonsAccessComponentFixture.componentInstance;
        buttonsAccessComponentFixture.detectChanges();


    }));

    beforeEach(() => {
        registerService = TestBed.inject(RegisterService);
        recoverService = TestBed.inject(RecoverService);
        loginService = TestBed.inject(LoginService);
        systemAccessService = TestBed.inject(SystemAccessService);
        guard = TestBed.inject(SystemAccessResolver);
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('buttonsAccessComponent', () => {
        expect(buttonsAccessComponent).toBeTruthy();
    });

    it('recoverService', () => {
        expect(recoverService).toBeTruthy();
    });

    it('recoverService', () => {
        expect(recoverService).toBeTruthy();
    });

    it('loginService', () => {
        expect(loginService).toBeTruthy();
    });

    it('systemAccessService', () => {
        expect(systemAccessService).toBeTruthy();
    });

    it('guard', () => {
        expect(guard).toBeTruthy();
    });

});
