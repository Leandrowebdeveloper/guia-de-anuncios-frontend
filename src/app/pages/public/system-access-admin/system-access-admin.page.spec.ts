import { Storage } from '@ionic/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SystemAccessAdminPage } from './system-access-admin.page';
import { LoginService } from './services/login-admin/login-admin.service';
import { SystemAccessService } from './services/system-access-admin.service';

import { FormComponentModule } from 'src/app/components/form/form.module';
import { SystemAccessResolver } from '../system-access/guard/resolve.guard';

describe('SystemAccessAdminPage', () => {
    let component: SystemAccessAdminPage;
    let fixture: ComponentFixture<SystemAccessAdminPage>;

    let systemAccessService: SystemAccessService;
    let loginService: LoginService;
    let guard: SystemAccessResolver;



    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                SystemAccessAdminPage,
            ],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                FormComponentModule,
            ],
            providers: [
                Storage,
                SystemAccessService,
                LoginService,
                SystemAccessResolver,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SystemAccessAdminPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

    }));

    beforeEach(() => {
        loginService = TestBed.inject(LoginService);
        systemAccessService = TestBed.inject(SystemAccessService);
        guard = TestBed.inject(SystemAccessResolver);
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
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
