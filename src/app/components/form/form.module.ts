import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormServices } from './services/form.service';
import { IonicModule } from '@ionic/angular';
import { ConfigForm } from './config/index';
import { RouterModule } from '@angular/router';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';

@NgModule({
  declarations: [FormComponent, PasswordStrengthComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, IonicModule],
  exports: [FormComponent],
  providers: [FormServices, ConfigForm],
})
export class FormComponentModule {}
