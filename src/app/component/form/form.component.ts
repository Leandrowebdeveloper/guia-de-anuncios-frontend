import { Output, Input, EventEmitter, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormServices } from './services/form.service';
import { ConfigForm } from './config';
import { Attributes } from './interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
/**
 * @class FormComponent
 */
export class FormComponent implements OnInit {
  @Input() inputConfig: object; // variavel de solicitação dos inputs
  @Input() router: string; // rota da pagina
  @Input() labelButton: string; // rotulo do botão
  @Input() iconButton: string; // icon do botão
  @Output() formData = new EventEmitter<FormGroup>(undefined);
  public form: FormGroup; // Construtor do formulário
  public buildInputs: Attributes[]; // Construtor dos campos do formulário
  public submitted = false;
  public visiblePassword: boolean;

  constructor(
    private configForm: ConfigForm,
    private fb: FormBuilder,
    private formServices: FormServices
  ) {}

  ngOnInit() {
    this.formBuild();
    this.init();
  }

  /**
   * @class FormComponent
   * @function f
   * @readonly controle do formulário
   */
  public get f() {
    return this.form.controls;
  }

  public onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    return this.formData.emit(this.form);
  }

  public showPassword() {
    return (this.visiblePassword = !this.visiblePassword);
  }

  /**
   * @class FormComponent
   * @function init
   * @readonly Inicializa os campos do formulário
   * @type void
   * @returns void
   */
  private init(): void {
    this.buildInputs = this.formServices.buildInput(
      this.inputConfig,
      this.configForm.input
    );
  }

  /**
   * @class FormComponent
   * @function formBuild
   * @readonly Inicializa o formulário
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
