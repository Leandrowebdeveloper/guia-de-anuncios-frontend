import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ClassifiedPage } from './classified.page';

describe('ClassifiedPage', () => {
    let component: ClassifiedPage;
    let fixture: ComponentFixture<ClassifiedPage>;



    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ClassifiedPage],
            imports: [IonicModule.forRoot(), RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ClassifiedPage);
        component = fixture.componentInstance;
        fixture.detectChanges();


    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});
