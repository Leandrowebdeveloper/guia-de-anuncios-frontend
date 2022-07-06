import { Injectable } from '@angular/core';
import { InputName } from '../interface';

/**
 * @class ConfigForm
 * @readonly Configuração dos atributos de formulários
 */
@Injectable({ providedIn: 'root'})

export class ConfigForm {
    public readonly input: InputName = {
        id: null,
        firstName: {
            name: 'firstName',
            label: 'Nome',
            placeholder: 'Entre com seu nome',
            type: 'text',
            actionLabel: 'Entre com seu nome',
            msg: {
                invalid: 'Digite nome próprio ou todas letras em maiuscúlo.',
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
            actionLabel: 'Entre com seu sobrenome',
            msg: {
                invalid: 'Digite nome próprio ou todas letras em maiuscúlo.',
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
            actionLabel: 'Entre com seu email',
            msg: {
                invalid: 'Email inválido!',
                empty: 'Email obrigatório!',
                min: null,
                max: null,
            },
        },
        passwordCurrent: {
            name: 'passwordCurrent',
            label: 'Senha atual',
            placeholder: 'Entre com sua senha atual',
            type: 'password',
            actionLabel: 'Entre com sua senha atual',
            msg: {
                invalid: '',
                empty: 'Senha obrigatório!',
                min: '',
                max: '',
            },
        },
        password: {
            name: 'password',
            label: 'Senha',
            placeholder: 'Entre com sua senha',
            type: 'password',
            actionLabel: 'Entre com sua senha',
            msg: {
                invalid: 'Senha inválida!',
                empty: 'Senha obrigatório!',
                min: 'Senha mínimo 8.',
                max: 'Senha maxímo 20.',
            },
        },
        passwordConfirmation: {
            name: 'passwordConfirmation',
            label: 'Confirmar senha',
            placeholder: 'Repita sua senha',
            type: 'password',
            actionLabel: 'Repita sua senha',
            msg: {
                invalid: 'Confirmação de senha inválida!',
                empty: 'Confirmação de senha obrigatório!',
                min: 'Senha mínimo 8.',
                max: 'Senha maxímo 20.',
            },
        },
        stayConnected: {
            name: 'stayConnected',
            label: 'Permanecer conectado?',
            placeholder: 'Permanecer conectado?',
            type: 'checkbox',
            actionLabel: null,
            msg: {
                invalid: null,
                empty: null,
                min: null,
                max: null,
            },
        },
        terms: {
            name: 'terms',
            label: 'Aceitar termos!',
            placeholder: '',
            type: 'checkbox',
            actionLabel: 'Aceitar termos de uso!',
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
