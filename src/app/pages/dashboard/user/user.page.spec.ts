import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserPage } from './user.page';
import { FormComponentModule } from 'src/app/components/form/form.module';
import { HeaderComponentModule } from 'src/app/header/header.component.module';
import { HeaderModalModule } from 'src/app/components/header-modal/header-modal.module';
import { GaleryComponentModule } from 'src/app/components/galery/galery-component.module';
import { FormEmailComponent } from './components/email/form/form.component';
import { EmailComponent } from './components/email/email.component';
import { FormPasswordComponent } from './components/password/form/form.component';
import { PasswordComponent } from './components/password/password.component';
import { FormNameComponent } from './components/name/form/form.component';
import { NameComponent } from './components/name/name.component';
import { StateComponent } from './components/status/state.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FormComponent } from 'src/app/components/form/form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Storage } from '@ionic/storage';

describe('UserPage', () => {
    let component: UserPage;
    let fixture: ComponentFixture<UserPage>;

    let avatarComponent: AvatarComponent;
    let componentFixtureAvatar: ComponentFixture<AvatarComponent>;

    let emailComponent: EmailComponent;
    let componentFixtureEmail: ComponentFixture<EmailComponent>;
    let formEmailComponent: FormEmailComponent;
    let formEmailComponentFixture: ComponentFixture<FormEmailComponent>;

    let nameComponent: NameComponent;
    let nameComponentFixture: ComponentFixture<NameComponent>;
    let formNameComponent: FormNameComponent;
    let formNameComponentFixture: ComponentFixture<FormNameComponent>;

    let passwordComponent: PasswordComponent;
    let passwordComponentFixture: ComponentFixture<PasswordComponent>;
    let formPasswordComponent: FormPasswordComponent;
    let formPasswordComponentFixture: ComponentFixture<FormPasswordComponent>;

    let stateComponent: StateComponent;
    let stateComponentFixture: ComponentFixture<StateComponent>;

    let storageService: StorageService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserPage,
                AvatarComponent,
                StateComponent,
                NameComponent,
                FormNameComponent,
                PasswordComponent,
                FormPasswordComponent,
                EmailComponent,
                FormEmailComponent,
            ],
            imports: [
                IonicModule.forRoot(),
                HttpClientTestingModule,
                RouterTestingModule,
                FormComponentModule,
                HeaderComponentModule,
                HeaderModalModule,
                GaleryComponentModule,
            ],
            providers: [FormComponent, StorageService, Storage],
        }).compileComponents();

        fixture = TestBed.createComponent(UserPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

        componentFixtureAvatar = TestBed.createComponent(AvatarComponent);
        avatarComponent = componentFixtureAvatar.componentInstance;
        componentFixtureAvatar.detectChanges();

        componentFixtureEmail = TestBed.createComponent(EmailComponent);
        emailComponent = componentFixtureEmail.componentInstance;
        componentFixtureEmail.detectChanges();

        formEmailComponentFixture = TestBed.createComponent(FormEmailComponent);
        formEmailComponent = formEmailComponentFixture.componentInstance;
        formEmailComponentFixture.detectChanges();

        nameComponentFixture = TestBed.createComponent(NameComponent);
        nameComponent = nameComponentFixture.componentInstance;
        nameComponentFixture.detectChanges();

        formNameComponentFixture = TestBed.createComponent(FormNameComponent);
        formNameComponent = formNameComponentFixture.componentInstance;
        formNameComponentFixture.detectChanges();

        passwordComponentFixture = TestBed.createComponent(PasswordComponent);
        passwordComponent = passwordComponentFixture.componentInstance;
        passwordComponentFixture.detectChanges();

        formPasswordComponentFixture = TestBed.createComponent(
            FormPasswordComponent
        );
        formPasswordComponent = formPasswordComponentFixture.componentInstance;
        formPasswordComponentFixture.detectChanges();

        stateComponentFixture = TestBed.createComponent(StateComponent);
        stateComponent = stateComponentFixture.componentInstance;
        stateComponentFixture.detectChanges();
    }));

    beforeEach(() => {
        storageService = TestBed.inject(StorageService);
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should create avatarComponent', () => {
        expect(avatarComponent).toBeTruthy();
    });

    it('should create emailComponent', () => {
        expect(emailComponent).toBeTruthy();
    });

    it('should create formEmailComponent', () => {
        expect(formEmailComponent).toBeTruthy();
    });

    it('should create nameComponent', () => {
        expect(nameComponent).toBeTruthy();
    });

    it('should create formNameComponent', () => {
        expect(formNameComponent).toBeTruthy();
    });

    it('should create passwordComponent', () => {
        expect(passwordComponent).toBeTruthy();
    });

    it('should create formPasswordComponent', () => {
        expect(formPasswordComponent).toBeTruthy();
    });

    it('should create stateComponent', () => {
        expect(stateComponent).toBeTruthy();
    });
});
