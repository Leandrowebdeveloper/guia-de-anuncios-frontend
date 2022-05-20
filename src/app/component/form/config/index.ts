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
      placeholder: 'Entre com seu nome',
      type: 'text',
      ActionLabel: 'Entre com seu nome',
      msg: {
        invalid: 'Nome inválido! Ex: Maria, José, Sthefanni',
        empty: 'Nome obrigatório!',
        min: null,
        max: null,
      },
    },
    lastName: {
      name: 'lastName',
      label: 'Sobrenome',
      placeholder: 'Entre com seu sobrenome',
      type: 'text',
      ActionLabel: 'Entre com seu sobrenome',
      msg: {
        invalid: 'Nome inválido! Ex: Maria, José, Sthefanni',
        empty: 'Nome obrigatório!',
        min: null,
        max: null,
      },
    },
    email: {
      name: 'email',
      label: 'Email',
      placeholder: 'Entre com seu email',
      type: 'email',
      ActionLabel: 'Entre com seu email',
      msg: {
        invalid: 'Email inválido!',
        empty: 'Email obrigatório!',
        min: null,
        max: null,
      },
    },
    password: {
      name: 'password',
      label: 'Senha',
      placeholder: 'Entre com sua senha',
      type: 'password',
      ActionLabel: 'Entre com sua senha',
      msg: {
        invalid: 'Senha inválida!',
        empty: 'Senha obrigatório!',
        min: 'Senha mínimo 8.',
        max: 'Senha maxímo 32.',
      },
    },
    passwordConfirmation: {
      name: 'passwordConfirmation',
      label: 'Confirme a senha',
      placeholder: 'Repita sua senha',
      type: 'password',
      ActionLabel: 'Repita sua senha',
      msg: {
        invalid: 'Confirmação de senha não e válida!',
        empty: 'Confirmação de senha obrigatório!',
        min: 'Senha mínimo 8.',
        max: 'Senha maxímo 32.',
      },
    },
    terms: {
      name: 'terms',
      label: 'Aceitar termos!',
      placeholder: '',
      type: 'checkbox',
      ActionLabel: 'Aceitar termos de uso!',
      msg: {
        invalid: 'Você precisa aceitar os termos de uso!',
        empty: 'Termos obrigatório!',
        min: '',
        max: '',
      },
    },
    _csrf: null,
  };
}
