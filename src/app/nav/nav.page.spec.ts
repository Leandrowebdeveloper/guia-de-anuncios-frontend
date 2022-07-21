import { Storage } from '@ionic/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavPage } from './nav.page';

describe('NavPage', () => {
    let component: NavPage;
    let fixture: ComponentFixture<NavPage>;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NavPage],
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [Storage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
