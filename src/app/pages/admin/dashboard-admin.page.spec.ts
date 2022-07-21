import { HeaderModalModule } from '../../components/header-modal/header-modal.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard-admin.page';

import { HeaderModalComponent } from 'src/app/components/header-modal/header-modal.component';

describe('DashboardPage', () => {
    let component: DashboardPage;
    let fixture: ComponentFixture<DashboardPage>;



    let headerModalComponent: HeaderModalComponent;
    let headerModalComponentFixture: ComponentFixture<HeaderModalComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardPage],
            imports: [
                IonicModule.forRoot(),
                HttpClientTestingModule,
                RouterTestingModule,
                HeaderModalModule
            ],
            providers: [Storage],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardPage);
        component = fixture.componentInstance;
        fixture.detectChanges();



        headerModalComponentFixture =
            TestBed.createComponent(HeaderModalComponent);
        headerModalComponent = headerModalComponentFixture.componentInstance;
        headerModalComponentFixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });



    it('should create', () => {
        expect(headerModalComponent).toBeTruthy();
    });
});
