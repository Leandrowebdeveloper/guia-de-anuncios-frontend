import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Storage } from '@ionic/storage-angular';
import { ChangeEmailPage } from './change-email.page';

describe('ChangeEmailPage', () => {
  let component: ChangeEmailPage;
  let fixture: ComponentFixture<ChangeEmailPage>;
  let storageService: StorageService;
  let storage: Storage;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeEmailPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [StorageService, Storage]
    }).compileComponents();

    storageService = TestBed.inject(StorageService);
    storage = TestBed.inject(Storage);
    fixture = TestBed.createComponent(ChangeEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
