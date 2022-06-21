import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SystemAccessPageButtons } from './system-access-page-buttons.page';

describe('SystemAccessPageButtons', () => {
  let component: SystemAccessPageButtons;
  let fixture: ComponentFixture<SystemAccessPageButtons>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAccessPageButtons ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SystemAccessPageButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
