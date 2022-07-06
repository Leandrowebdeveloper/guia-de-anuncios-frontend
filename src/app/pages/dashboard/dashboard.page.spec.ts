import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { HeaderComponentModule } from 'src/app/header/header.component.module';

describe('DashboardPage', () => {
    let component: DashboardPage;
    let fixture: ComponentFixture<DashboardPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardPage],
            imports: [
                IonicModule.forRoot(),
                HttpClientTestingModule,
                RouterTestingModule,
                HeaderComponentModule,
            ],
            providers: [Storage],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
