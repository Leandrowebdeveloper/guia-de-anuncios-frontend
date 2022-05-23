import { Output, Input, EventEmitter, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormServices } from './services/form.service';
import { ConfigForm } from './config';
import { Attributes } from './interface';
import { AttrButton } from '../buttons/system-access-page-buttons/interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
/**
 * @file src/app/component/form/form.component.ts
 * @class FormComponent
 * @implements OnInit
 */
export class FormComponent implements OnInit {
  @Input() inputConfig: object; // Os campos de inputs a ser carregado
  @Input() attrButton: AttrButton; // Os atributos do botão submit
  @Output() submitDataForm = new EventEmitter<FormGroup>(undefined); // Submete os dados do formulário
  @Output() exportForm = new EventEmitter<FormGroup>(undefined); // Ao carregar a pagina adiciona o formulário
  public form: FormGroup; // Construtor do formulário
  public buildInputs: Attributes[]; // Construtor dos campos do formulário
  public submitted = false; // Gatilio das menssagens de erro
  public visiblePassword: boolean; // Senha vizivel

  constructor(
    private configForm: ConfigForm,
    private fb: FormBuilder,
    private formServices: FormServices
  ) {}

  ngOnInit() {
    this.formBuild();
    this.inputFilter();
    this.importForm();
  }

  /**
   * @class FormComponent
   * @function f
   * @readonly controle do formulário
   */
  public get f() {
    return this.form.controls;
  }

  /**
   * @class FormComponent
   * @function onSubmit
   * @readonly Dispara o envio do formulário
   * @type void
   * @returns void
   */
  public onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    return this.submitDataForm.emit(this.form);
  }

  /**
   * @class FormComponent
   * @function showPassword
   * @readonly Alterna entre ocultar senha e visualizar senha
   * @type void
   * @returns boolena
   */
  public showPassword(): boolean {
    return (this.visiblePassword = !this.visiblePassword);
  }

  /**
   * @class FormComponent
   * @function inputFilter
   * @readonly Filtra os campos dos formulários
   * @type void
   * @returns void
   */
  private importForm(): void {
    return this.exportForm.emit(this.form);
  }

  /**
   * @class FormComponent
   * @function inputFilter
   * @readonly Filtra quais campos dos formulários serão aplicados na página
   * @type void
   * @returns void
   */
  private inputFilter(): void {
    this.buildInputs = this.formServices.buildInput(
      this.inputConfig,
      this.configForm.input
    );
  }

  /**
   * @class FormComponent
   * @function formBuild
   * @readonly Contrutor do formulário
   * @type FormGroup
   * @returns
   */
  private formBuild(): FormGroup {
    const data = this.formServices.controlsConfig(this.inputConfig);
    const validator = this.formServices.isPasswordConfirmation(
      this.inputConfig
    );
    return (this.form = this.fb.group(data, validator));
  }
}
