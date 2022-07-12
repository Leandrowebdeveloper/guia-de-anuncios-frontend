import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RedefinePasswordPage } from './redefine-password.page';
import { RedefinePasswordService } from './services/redefine-password.service';
import { RedefinePasswordResolver } from './guard/resolve.guard';
import { FormComponentModule } from 'src/app/components/form/form.module';


describe('RedefinePasswordPage', () => {
    let component: RedefinePasswordPage;
    let fixture: ComponentFixture<RedefinePasswordPage>;

    let guard: RedefinePasswordResolver;
    let service: RedefinePasswordService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RedefinePasswordPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                FormComponentModule
            ],
            providers: [RedefinePasswordService, RedefinePasswordResolver],
        }).compileComponents();

        fixture = TestBed.createComponent(RedefinePasswordPage);
        component = fixture.componentInstance;
        fixture.detectChanges();


    }));

    beforeEach(() => {
        guard = TestBed.inject(RedefinePasswordResolver);
        service = TestBed.inject(RedefinePasswordService);
    });

    it('should be created guard', () => {
        expect(guard).toBeTruthy();
    });

    it('should be created service', () => {
        expect(service).toBeTruthy();
      });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });


});
