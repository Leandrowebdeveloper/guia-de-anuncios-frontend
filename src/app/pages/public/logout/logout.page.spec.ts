import { Storage } from '@ionic/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogoutPage } from './logout.page';
import { LogoutService } from './service/logout.service';
import { HeaderComponentModule } from 'src/app/header/header.component.module';
import { HeaderComponent } from 'src/app/header/header.component';

describe('LogoutPage', () => {
    let component: LogoutPage;
    let fixture: ComponentFixture<LogoutPage>;

    let headerComponent: HeaderComponent;
    let headerComponentFixture: ComponentFixture<HeaderComponent>;

    let service: LogoutService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LogoutPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                HeaderComponentModule,
            ],
            providers: [Storage, LogoutService],
        }).compileComponents();

        fixture = TestBed.createComponent(LogoutPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

        headerComponentFixture = TestBed.createComponent(HeaderComponent);
        headerComponent = headerComponentFixture.componentInstance;
        headerComponentFixture.detectChanges();
    }));

    beforeEach(() => {
        service = TestBed.inject(LogoutService);
    });

    it('LogoutService', () => {
        expect(service).toBeTruthy();
    });

    it('component', () => {
        expect(component).toBeTruthy();
    });

    it('should create headerComponent', () => {
        expect(headerComponent).toBeTruthy();
    });
});
