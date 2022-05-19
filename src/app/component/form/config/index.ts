import { InputName } from '../interface';

/**
 * @class ConfigForm
 * @readonly Configuração dos atributos de formulários
 */
export class ConfigForm {

  /**
   * @readonly Variavel de atributos
   */
  public readonly input: InputName = {
    firstName: {
      name: 'firstName',
      label: 'Nome',
      type: 'text',
      msg: {
        invalid: 'Nome inválido! Ex: Maria, José, Sthefanni',
        empty: 'Nome obrigatório!',
        min: '',
        max: ''
      },
    },
    lastName: {
      name: 'lastName',
      label: 'Sobrenome',
      type: 'text',
      msg: {
        invalid: 'Nome inválido! Ex: Maria, José, Sthefanni',
        empty: 'Nome obrigatório!',
        min: '',
        max: ''
      },
    },
    email: {
      name: 'email',
      label: 'Email',
      type: 'email',
      msg: {
        invalid: 'Nome inválido! Ex: Maria, José, Sthefanni',
        empty: 'Nome obrigatório!',
        min: '',
        max: ''
      },
    },
    password: {
      name: 'password',
      label: 'Senha',
      type: 'password',
      msg: {
        invalid: 'Senha inválida!',
        empty: 'Senha obrigatório!',
        min: 'Senha mínimo 8.',
        max: ''
      },
    },
    passwordConfirmation: {
      name: 'passwordConfirmation',
      label: 'Confirme a senha',
      type: 'password',
      msg: {
        invalid: 'Confirmação de senha não e válida!',
        empty: 'Confirmação de senha obrigatório!',
        min: '',
        max: ''
      },
    },
    terms: {
      name: 'terms',
      label: 'Aceitar termos!',
      type: 'checkbox',
      msg: {
        invalid: 'Você precisa aceitar os termos de uso!',
        empty: 'Termos obrigatório!',
        min: '',
        max: ''
      },
    },
    _csrf: null,
  };
}
