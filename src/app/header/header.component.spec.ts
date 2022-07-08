import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { BreadcrumbsService } from './breadcrumbs/service/breadcrumbs.service';
import { BreadcrumpsComponent } from './breadcrumbs/breadcrumbs.component';

describe('HeaderComponent', () => {
    let headerComponent: HeaderComponent;
    let headerComponentFixture: ComponentFixture<HeaderComponent>;

    let breadcrumpsComponent: BreadcrumpsComponent;
    let breadcrumpsComponentFixture: ComponentFixture<BreadcrumpsComponent>;
    let breadcrumbsService: BreadcrumbsService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent, BreadcrumpsComponent],
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

    beforeEach(() => {
        breadcrumbsService = TestBed.inject(BreadcrumbsService);
    });

    it('should be created breadcrumbsService', () => {
        expect(breadcrumbsService).toBeTruthy();
    });

    it('should create headerComponent', () => {
        expect(headerComponent).toBeTruthy();
    });
});
