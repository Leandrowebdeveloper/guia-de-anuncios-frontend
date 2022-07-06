import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BreadcrumpsComponent } from './breadcrumbs.component';
import { BreadcrumbsService } from './service/breadcrumbs.service';

describe('BreadcrumpsComponent', () => {
  let component: BreadcrumpsComponent;
  let fixture: ComponentFixture<BreadcrumpsComponent>;
  let breadcrumbsService: BreadcrumbsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumpsComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [BreadcrumbsService]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    breadcrumbsService = TestBed.inject(BreadcrumbsService);
  });

  it('should be created', () => {
    expect(breadcrumbsService).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
