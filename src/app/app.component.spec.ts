import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { BreadcrumpsComponent } from './header/breadcrumbs/breadcrumbs.component';
import { BreadcrumbsService } from './header/breadcrumbs/service/breadcrumbs.service';
import { HeaderComponent } from './header/header.component';

describe('AppComponent', () => {
    let headerComponent: HeaderComponent;
    let headerComponentFixture: ComponentFixture<HeaderComponent>;

    let breadcrumpsComponent: BreadcrumpsComponent;
    let breadcrumpsComponentFixture: ComponentFixture<BreadcrumpsComponent>;

    let breadcrumbsService: BreadcrumbsService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, HeaderComponent, BreadcrumpsComponent],
            imports: [IonicModule.forRoot(), RouterTestingModule],
            providers: [BreadcrumbsService],
        }).compileComponents();

        headerComponentFixture = TestBed.createComponent(HeaderComponent);
        headerComponent = headerComponentFixture.componentInstance;
        headerComponentFixture.detectChanges();

        breadcrumpsComponentFixture =
            TestBed.createComponent(BreadcrumpsComponent);
        breadcrumpsComponent = breadcrumpsComponentFixture.componentInstance;
        breadcrumpsComponentFixture.detectChanges();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    beforeEach(() => {
        breadcrumbsService = TestBed.inject(BreadcrumbsService);
    });

    it('should be created breadcrumbsService', () => {
        expect(breadcrumbsService).toBeTruthy();
    });

    it('should create headerComponent', () => {
        expect(headerComponent).toBeTruthy();
    });

    // TODO: add more tests!
});
