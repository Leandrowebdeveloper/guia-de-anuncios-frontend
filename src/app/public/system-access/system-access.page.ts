import { SystemAccessService } from './services/system-access.service';
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
  selector: 'app-system-access',
  templateUrl: './system-access.page.html',
  styleUrls: [
    './system-access.page.scss',
    './../activate-account/activate-account.page.scss',
  ],
})
export class SystemAccessPage implements OnInit, OnComponentDeactivate {
  public desable: boolean;
  public time: string;
  public config: User;
  private form: FormGroup;
  private urlTree: boolean;
  private systemAccess: Subscription;
  private requiriment: RequisitionLimit;
  private _attrButton: AttrButton;

  constructor(
    private activatedRoute: ActivatedRoute,
    private systemAccessService: SystemAccessService,
    private helpsService: HelpsService
  ) {}

  ngOnInit() {
    this.setConfig();
    this.hasDesable();
    this.initattrButton();
  }

  private get activeRoute(): string {
    return this.activatedRoute.snapshot.parent.routeConfig.path;
  }

  public get attrButton(): AttrButton {
    return this._attrButton;
  }
  public set attrButton(value: AttrButton) {
    this._attrButton = value;
  }

  private initattrButton(): void {
    switch (this.activeRoute) {
      case 'entrar':
        this.attrButton = this.systemAccessService.attrButton[0];
        break;
      case 'recuperar-senha':
        this.attrButton = this.systemAccessService.attrButton[1];
        break;
      case 'cadastrar':
        this.attrButton = this.systemAccessService.attrButton[2];
        break;
    }
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
    switch (this.activeRoute) {
      case 'entrar':
        return this.login(event);
      case 'recuperar-senha':
        return this.recover(event);
      case 'cadastrar':
        return this.register(event);
    }
  }

  private login(event: FormGroup): Subscription {
    this.setRouter('login');
    const loading = this.showLoading('Acessar o sistema...');
    return (this.systemAccess = this.systemAccessService
      .sendLoginData(event.value)
      .subscribe(
        (user: User) => this.success(user, loading),
        (error: HttpErrorResponse) => this.error(error, loading)
      ));
  }

  private register(event: FormGroup): Subscription {
    this.setRouter('register');
    const loading = this.showLoading('Cadastrando usuário...');
    return (this.systemAccess = this.systemAccessService
      .register(event.value)
      .subscribe(
        (user: User) => this.success(user, loading),
        (error: HttpErrorResponse) => this.error(error, loading)
      ));
  }

  private recover(event: FormGroup): Subscription {
    this.setRouter('recover');
    const loading = this.showLoading('Recuperando senha...');
    return (this.systemAccess = this.systemAccessService
      .passwordRecover(event.value)
      .subscribe(
        (user: User) => this.success(user, loading),
        (error: HttpErrorResponse) => this.error(error, loading)
      ));
  }

  private showLoading(message: string): Promise<HTMLIonLoadingElement> {
    return this.systemAccessService.loading(message);
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
    return this.systemAccessService.success(user, loading, this.systemAccess);
  }

  private error(
    error: HttpErrorResponse,
    loading: Promise<HTMLIonLoadingElement>
  ) {
    this.requisitionLimit(error);
    return this.systemAccessService.error(error, loading, this.systemAccess);
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
    this.config = this.activatedRoute.snapshot.data.systemAccess;
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

  private setRouter(route: 'login' | 'recover' | 'register') {
    this.systemAccessService.activeRoute = route;
  }
}
