import { RegisterService } from './services/register.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { User } from 'src/app/interface';
import { AttrButton } from 'src/app/component/buttons/system-access-page-buttons/interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { OnComponentDeactivate } from 'src/app/component/form/guard/deactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
/**
 * @file src/app/pages/register/register.page.ts
 * @class RegisterPage
 * @implements OnInit, OnComponentDeactivate
 */
export class RegisterPage implements OnInit, OnComponentDeactivate {
  public config: User; // Configuração dos inputs do formulários
  public attrButton: AttrButton; // Atributos do botão submit
  private register: Subscription; // Assinatura da chamada http
  private form: FormGroup; // Construtor do formulário
  constructor(
    private activatedRoute: ActivatedRoute,
    private registerService: RegisterService
  ) {}

  ngOnInit() {
    this.setConfig();
    this.setAttrButton();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.form.dirty) {
      return confirm(
        'As alterações no formulário não foram salvas e serão descartadas, deseja prosseguir?'
      );
    } else {
      return true;
    }
  }

  /**
   * @class RegisterPage
   * @function onSubmit
   * @readonly Envia dados do formulário para registro
   * @type Subscription
   * @param event FormGroup
   * @returns void
   */
  public onSubmit(event: FormGroup): Subscription {
    const loading = this.registerService.startLoading();
    return (this.register = this.registerService.store(event.value).subscribe(
      (user: User) =>
        this.registerService.success(user, loading, this.register),
      (error: HttpErrorResponse) =>
        this.registerService.error(error, loading, this.register)
    ));
  }

  /**
   * @class RegisterPage
   * @function importForm
   * @readonly Carrega o formulário
   * @type void
   * @param event FormGroup
   * @returns void
   */
  public importForm(event: FormGroup): void {
    this.form = event;
  }

  /**
   * @class RegisterPage
   * @function setConfig
   * @readonly Carrega as configurações do servidor
   * @type void
   * @returns void
   */
  private setConfig(): void {
    this.config = this.activatedRoute.snapshot.data.register;
  }

  /**
   * @class RegisterPage
   * @function setAttrButton
   * @readonly Seta os valores dos atributos do botão submit
   * @type void
   * @returns void
   */
  private setAttrButton(): void {
    this.attrButton = {
      route: 'cadastrar',
      icon: 'create',
      label: 'cadastrar',
      fill: false,
      aria: 'Criar conta.',
      title: 'Criar conta.',
    };
  }
}
