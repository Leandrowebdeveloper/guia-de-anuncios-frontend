import { Router } from '@angular/router';
import { Output, Input, EventEmitter, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServices } from './services/form.service';
import { ConfigForm } from './config';
import { Attributes } from './interface';
import { AttrButton } from '../buttons/system-access-page-buttons/interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() inputConfig: object;
  @Input() attrButton: AttrButton;
  @Output() submitDataForm = new EventEmitter<FormGroup>(undefined);
  @Output() exportForm = new EventEmitter<FormGroup>(undefined);
  public form: FormGroup;
  public buildInputs: Attributes[];
  public submitted = false;
  public visiblePassword: boolean;
  public isPageTheLogin: boolean;
  constructor(
    private configForm: ConfigForm,
    private fb: FormBuilder,
    private formServices: FormServices,
    private router: Router
  ) {}

  public get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.formBuild();
    this.inputFilter();
    this.importForm();
    this.isPageLogin();
    this.disableValidate();

  }


  public onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    return this.sendDataForm();
  }

  public showPassword(): boolean {
    return (this.visiblePassword = !this.visiblePassword);
  }

  private sendDataForm(): void {
    return this.submitDataForm.emit(this.form);
  }

  private isPageLogin() {
    this.isPageTheLogin = this.router.url === '/entrar';
  }

  private disableValidate(): void {
    if (this.isPageTheLogin) {
      this.form.get('password').clearValidators();
      this.form.get('password').setValidators([Validators.required]);
    }
  }

  private importForm(): void {
    return this.exportForm.emit(this.form);
  }

  private inputFilter(): void {
    this.buildInputs = this.formServices.buildInput(
      this.inputConfig,
      this.configForm.input
    );
  }

  private formBuild(): FormGroup {
    const data = this.formServices.controlsConfig(this.inputConfig);
    const validator = this.formServices.isPasswordConfirmation(
      this.inputConfig
    );
    return (this.form = this.fb.group(data, validator));
  }


}
