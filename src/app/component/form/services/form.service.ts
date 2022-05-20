import { Attributes, InputName } from './../interface';
import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Injectable()
/**
 * @class FormServices
 */
export class FormServices {
  /** Objeto contrutor de validação de senha */
  private passwordConfirmation = {
    validator: this.mustMatch('password', 'passwordConfirmation'),
  };

  /** Expressão regular para nomes próprios */
  private regexNameUpperCase =
    /^(?![ ])(?!.*(?:\d|[ ]{2}|[!$%^&*()_+|~=\{\}\[\]:";<>?,\/]))(?:(?:e|da|do|das|dos|de|d'|D'|la|las|el|los|l')\s*?|(?:[A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'][^\s]*\s*?)(?!.*[ ]$))+$/;

  /** Objeto construtor de formularios */
  private controls = {
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.regexNameUpperCase),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.regexNameUpperCase),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
    passwordConfirmation: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(32)],
    ],
    terms: ['true', [Validators.required, Validators.pattern('true')]],
    _csrf: ['', [Validators.required]],
  };

  /**
   * @class FormServices
   * @function controlsConfig
   * @readonly Filtra o objeto construtor de formulários
   * @type Object
   * @param configs Objeto filds do formulario
   * @returns
   */
  public controlsConfig(configs: object): Object {
    const KEY = Object.keys(this.controls);
    const VALUES = Object.values(configs);
    let controls = {};
    let count = 0;
    for (const key in configs) {
      if (
        Object.prototype.hasOwnProperty.call(configs, key) &&
        KEY.includes(key) &&
        VALUES.includes(configs[key])
      ) {
        controls[key] = this.controls[key];
        controls[key][0] = VALUES[count];
      }
      count++;
    }
    return controls;
  }

  /**
   * @class FormServices
   * @function buildInput
   * @readonly Filtra o objeto construtor de formulários e adiciona os valores para os campos
   * @param configs Objeto filds do formulario
   * @param inputName Variavel input da class ConfigForm
   * @returns Attributes[]
   */
  public buildInput(configs: object, inputName: InputName): Attributes[] {
    const KEY = Object.keys(configs);
    const result = [];
    for (const key in inputName) {
      if (KEY.includes(key)) {
        result.push(inputName[key]);
      }
    }
    result.pop();
    return result;
  }

  /**
   * @class FormServices
   * @function isPasswordConfirmation
   * @readonly Caso exista o confirmação de senha 'passwordConfirmation' adiciona
   * @param configs Objeto filds do formulario
   * @returns Object
   */
  public isPasswordConfirmation(configs: object): Object {
    return Object.keys(configs).includes('passwordConfirmation')
      ? this.passwordConfirmation
      : {};
  }

  /**
   * @class FormServices
   * @function isPasswordConfirmation
   * @readonly Valida os campos password e passwordConfirmation
   * @param controlName atributo name do input
   * @param matchingControlName
   * @returns
   */
  private mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
