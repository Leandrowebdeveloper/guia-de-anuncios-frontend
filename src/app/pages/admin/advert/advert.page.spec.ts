import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AdvertPage } from './advert.page';

describe('AdvertPage', () => {
    let component: AdvertPage;
    let fixture: ComponentFixture<AdvertPage>;



    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AdvertPage],
            imports: [IonicModule.forRoot(), RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(AdvertPage);
        component = fixture.componentInstance;
        fixture.detectChanges();


    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});
