import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfigForm } from './config';

import { FormComponent } from './form.component';
import { FormServices } from './services/form.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  let formServices: FormServices;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [IonicModule.forRoot(), FormsModule, RouterTestingModule],
      providers: [ConfigForm, FormBuilder, FormServices],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    formServices = TestBed.inject(FormServices);
  });

  it('should be created', () => {
    expect(formServices).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
