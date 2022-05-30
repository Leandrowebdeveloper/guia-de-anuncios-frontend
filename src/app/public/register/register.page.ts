import { HelpsService } from 'src/app/services/helps/helps.service';
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
export class RegisterPage implements OnInit, OnComponentDeactivate {
  public config: User;
  public attrButton: AttrButton;
  private register: Subscription;
  private form: FormGroup;
  private urlTree: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private registerService: RegisterService,
    private helpsService: HelpsService
  ) {}

  ngOnInit() {
    this.setConfig();
    this.setAttrButton();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return this.authorizeRoute() || this.canAuthorizeTheRoute() || true;
  }

  private disableCanDeactivate(): boolean {
    return (this.urlTree = true);
  }

  private authorizeRoute(): boolean {
    return this.urlTree;
  }

  private canAuthorizeTheRoute(): boolean {
    return this.helpsService.authorizeTheRoute(this.form);
  }

  public onSubmit(event: FormGroup): Subscription {
    const loading = this.registerService.loading();
    return (this.register = this.registerService.store(event.value).subscribe(
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
    return this.registerService.success(user, loading, this.register);
  }

  private error(
    error: HttpErrorResponse,
    loading: Promise<HTMLIonLoadingElement>
  ): any {
    return this.registerService.error(error, loading, this.register);
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

  public importForm(event: FormGroup): void {
    this.form = event;
  }

  private setConfig(): void {
    this.config = this.activatedRoute.snapshot.data.register;
  }

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
