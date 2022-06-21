import { ActivatedRoute, UrlTree } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { RedefinePasswordService } from './services/redefine-password.service';
import { User } from 'src/app/interface';
import { FormGroup } from '@angular/forms';
import { AttrButton } from 'src/app/components/buttons/system-access-page-buttons/interface';
import { Subscription } from 'rxjs';
import { HelpsService } from 'src/app/services/helps/helps.service';

@Component({
  selector: 'app-redefine-password',
  templateUrl: './redefine-password.page.html',
  styleUrls: ['./redefine-password.page.scss'],
})
export class RedefinePasswordPage implements OnInit {
  public config: User;
  public active: boolean;
  public attrButton: AttrButton;
  public message: string;
  private form: FormGroup;
  private urlTree: boolean;
  private redefine: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private helpsService: HelpsService,
    private redefinePasswordService: RedefinePasswordService
  ) {}

  ngOnInit() {
    this.setConfig();
    this.setAttrButton();
    this.isActived();
    this.setMessageLinkInvalid();
  }

  private setMessageLinkInvalid() {
    return (this.message = this.config.message || null);
  }

  private isActived(): boolean {
    return (this.active = this.config.active);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.authorizeRoute()) {
      return this.authorizeRoute();
    } else if (this.canAuthorizeTheRoute()) {
      return this.canDeactivatedConfirmAlert();
    }
    return true;
  }

  private disableCanDeactivate(): boolean {
    return (this.urlTree = true);
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

  public onSubmit(event: FormGroup) {
    console.log(event.value);

    const loading = this.redefinePasswordService.loading();
    return (this.redefine = this.redefinePasswordService
      .passwordRecover(event.value)
      .subscribe(
        (user: User) => this.success(user, loading),
        (error: HttpErrorResponse) => this.error(error, loading)
      ));
  }

  private success(user: User, loading: Promise<HTMLIonLoadingElement>): void {
    this.disableCanDeactivate();
    this.formUpdate();
    this.disableLoadingUnsubscribeRegisterVariableTriggerSuccessMessage(
      user,
      loading
    );
  }

  private disableLoadingUnsubscribeRegisterVariableTriggerSuccessMessage(
    user: User,
    loading: Promise<HTMLIonLoadingElement>
  ) {
    return this.redefinePasswordService.success(user, loading, this.redefine);
  }

  private error(
    error: HttpErrorResponse,
    loading: Promise<HTMLIonLoadingElement>
  ): any {
    return this.redefinePasswordService.error(error, loading, this.redefine);
  }

  private formUpdate(): number {
    return this.helpsService.delay(
      () =>
        this.helpsService.correctFormGroupValueRecalculatingStatusControlsAndErrorMessages(
          this.form,
          this.config
        ),
      2000
    );
  }

  public importForm(event: FormGroup) {
    this.form = event;
  }

  private setConfig(): void {
    this.config = this.activatedRoute.snapshot.data.redefinePassword;
  }

  private setAttrButton(): void {
    this.attrButton = {
      route: 'redefinir-senha',
      icon: 'arrow-up-circle',
      label: 'Redefinir senha',
      fill: false,
      aria: 'Redefinir senha.',
      title: 'Redefinir senha.',
    };
  }
}
