import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormServices } from './services/form.service';
import { IonicModule } from '@ionic/angular';
import { ConfigForm } from './config/index';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, IonicModule],
  exports: [FormComponent],
  providers: [FormServices, ConfigForm],
})
export class FormComponentModule {}
