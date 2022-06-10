import { RecoverService } from './services/recover.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { RequisitionLimit, User } from 'src/app/interface';
import { AttrButton } from 'src/app/component/buttons/system-access-page-buttons/interface';
import { OnComponentDeactivate } from 'src/app/component/form/guard/deactivate.guard';
import { HelpsService } from 'src/app/services/helps/helps.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit, OnComponentDeactivate {
  public desable: boolean;
  public time: string;
  public config: User;
  private form: FormGroup;
  private urlTree: boolean;
  private revocer: Subscription;
  private requiriment: RequisitionLimit;
  public readonly attrButton: AttrButton = {
    route: 'recuperar-senha',
    icon: 'arrow-up-circle',
    label: 'Recuperar senha',
    fill: false,
    aria: 'Recuperar senha.',
    title: 'Recuperar senha.',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpsService: HelpsService,
    private recoverService: RecoverService
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
    const loading = this.recoverService.loading();
    return (this.revocer = this.recoverService
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
    return this.recoverService.success(user, loading, this.revocer);
  }

  private error(
    error: HttpErrorResponse,
    loading: Promise<HTMLIonLoadingElement>
  ): any {
    this.requisitionLimit(error);
    return this.recoverService.error(error, loading, this.revocer);
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

  private setConfig(): any {
    this.addConfig();
    this.addRequirement();
  }

  private addRequirement() {
    this.requiriment = this.config.requisitionLimit;
  }

  private addConfig(): void {
    this.config = this.activatedRoute.snapshot.data.recover;
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
