import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/header/header.component';

import { NotFoundPage } from './not-found.page';

describe('NotFoundPage', () => {
    let component: NotFoundPage;
    let fixture: ComponentFixture<NotFoundPage>;

    let headerComponent: HeaderComponent;
    let headerComponentFixture: ComponentFixture<HeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NotFoundPage],
            imports: [IonicModule.forRoot(), RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(NotFoundPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

        headerComponentFixture = TestBed.createComponent(HeaderComponent);
        headerComponent = headerComponentFixture.componentInstance;
        headerComponentFixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create headerComponent', () => {
        expect(headerComponent).toBeTruthy();
    });
});
