import { HeaderModalModule } from './../../components/header-modal/header-modal.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { HeaderComponentModule } from 'src/app/header/header.component.module';
import { HeaderComponent } from 'src/app/header/header.component';
import { HeaderModalComponent } from 'src/app/components/header-modal/header-modal.component';

describe('DashboardPage', () => {
    let component: DashboardPage;
    let fixture: ComponentFixture<DashboardPage>;

    let headerComponent: HeaderComponent;
    let headerComponentFixture: ComponentFixture<HeaderComponent>;

    let headerModalComponent: HeaderModalComponent;
    let headerModalComponentFixture: ComponentFixture<HeaderModalComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardPage],
            imports: [
                IonicModule.forRoot(),
                HttpClientTestingModule,
                RouterTestingModule,
                HeaderComponentModule,
                HeaderModalModule
            ],
            providers: [Storage],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

        headerComponentFixture = TestBed.createComponent(HeaderComponent);
        headerComponent = headerComponentFixture.componentInstance;
        headerComponentFixture.detectChanges();

        headerModalComponentFixture =
            TestBed.createComponent(HeaderModalComponent);
        headerModalComponent = headerModalComponentFixture.componentInstance;
        headerModalComponentFixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create headerComponent', () => {
        expect(headerComponent).toBeTruthy();
    });

    it('should create', () => {
        expect(headerModalComponent).toBeTruthy();
    });
});
