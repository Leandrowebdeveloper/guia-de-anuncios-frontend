import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { FormServices } from './services/form.service';

@NgModule({
    declarations: [FormComponent, PasswordStrengthComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [FormComponent],
    providers: [FormServices]
})
export class FormComponentModule {}
