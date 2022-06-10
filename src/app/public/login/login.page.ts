import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AttrButton } from 'src/app/component/buttons/system-access-page-buttons/interface';
import { OnComponentDeactivate } from 'src/app/component/form/guard/deactivate.guard';
import { RequisitionLimit, User } from 'src/app/interface';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HelpsService } from 'src/app/services/helps/helps.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [
    './login.page.scss',
    './../activate-account/activate-account.page.scss',
  ],
})
export class LoginPage implements OnInit, OnComponentDeactivate {
  public desable: boolean;
  public time: string;
  public config: User;
  private form: FormGroup;
  private urlTree: boolean;
  private login: Subscription;
  private requiriment: RequisitionLimit;
  public readonly attrButton: AttrButton = {
    route: 'login',
    icon: 'log-in',
    label: 'Entrar',
    fill: false,
    aria: 'Acessar o sistema.',
    title: 'Acessar o sistema.',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private helpsService: HelpsService
  ) {}

  ngOnInit() {
    this.setConfig();
    this.hasDesable();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.authorizeRoute()) {
      return this.authorizeRoute();
    } else if (this.canAuthorizeTheRoute()) {
      return this.canDeactivatedConfirmAlert();
    }
    return true;
  }

  private disableCanDeactivate(user: User): boolean {
    return (this.urlTree = user.auth);
  }

  private authorizeRoute(): boolean {
    return this.urlTree;
  }

  private canAuthorizeTheRoute(): boolean {
    return this.helpsService.isAuthorizeTheRoute(this.form);
  }

  private canDeactivatedConfirmAlert() {
    return this.helpsService.messageAuthorizeTheRoute();
  }

  public onSubmit(event: FormGroup): Subscription {
    const loading = this.loginService.loading();
    return (this.login = this.loginService.sendLoginData(event.value).subscribe(
      (user: User) => this.success(user, loading),
      (error: HttpErrorResponse) => this.error(error, loading)
    ));
  }

  private success(user: User, loading: Promise<HTMLIonLoadingElement>) {
    this.disableCanDeactivate(user);
    this.formUpdate();
    return this.disableLoadingUnsubscribeRegisterVariableTriggerSuccessMessage(
      user,
      loading
    );
  }

  private disableLoadingUnsubscribeRegisterVariableTriggerSuccessMessage(
    user: User,
    loading: Promise<HTMLIonLoadingElement>
  ) {
    return this.loginService.success(user, loading, this.login);
  }

  private error(
    error: HttpErrorResponse,
    loading: Promise<HTMLIonLoadingElement>
  ) {
    this.requisitionLimit(error);
    return this.loginService.error(error, loading, this.login);
  }

  private requisitionLimit(error: HttpErrorResponse): void {
    if (error.status === 403) {
      this.helpsService.delay(() => {
        this.setError(error);
        this.hasDesable();
        this.formUpdate();
      }, 2500);
    }
  }

  private setError(error: HttpErrorResponse): void {
    this.requiriment = error.error;
  }

  private formUpdate(): void {
    this.helpsService.delay(() => {
      this.helpsService.correctFormGroupValueRecalculatingStatusControlsAndErrorMessages(
        this.form,
        this.config
      );
    }, 2500);
  }

  public importForm(event: FormGroup): FormGroup {
    return (this.form = event);
  }

  private setConfig(): any {
    this.addConfig();
    this.addRequirement();
  }

  private addRequirement() {
    this.requiriment = this.config.requisitionLimit;
  }

  private addConfig() {
    this.config = this.activatedRoute.snapshot.data.login;
  }

  private hasDesable(): void {
    this.getDesable();
    if (this.desable) {
      this.getTimeLeftToUnlock();
    }
  }

  private getDesable(): void {
    if (this.requiriment) {
      this.addDesable();
    }
  }

  public setDesable(event: boolean): void {
    this.desable = event;
  }

  private addDesable(): void {
    this.desable = this.isDesabled();
  }

  private isDesabled(): boolean {
    return this.requiriment.count >= 3;
  }

  public getTimeLeftToUnlock(): void {
    this.time = this.requiriment?.delay;
  }
}
