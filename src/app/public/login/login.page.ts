import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AttrButton } from 'src/app/component/buttons/system-access-page-buttons/interface';
import { OnComponentDeactivate } from 'src/app/component/form/guard/deactivate.guard';
import { User } from 'src/app/interface';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HelpsService } from 'src/app/services/helps/helps.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnComponentDeactivate {
  public config: User;
  public attrButton: AttrButton;
  private login: Subscription;
  private form: FormGroup;
  private urlTree: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private helpsService: HelpsService
  ) {}

  ngOnInit() {
    this.setConfig();
    this.setAttrButton();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.authorizeRoute()) {
      return this.authorizeRoute();
    } else if (this.canAuthorizeTheRoute()) {
      return this.canDeactivatedConfirmAlert();
    }
    return true;
  }

  public onSubmit(event: FormGroup): Subscription {
    const loading = this.loginService.loading();
    return (this.login = this.loginService.sendLoginData(event.value).subscribe(
      (user: User) => {
        this.disableCanDeactivate(user);
        this.formUpdate();
        return this.loginService.success(user, loading, this.login);
      },
      (error: HttpErrorResponse) =>
        this.loginService.error(error, loading, this.login)
    ));
  }

  private formUpdate(): void {
    this.helpsService.delay(() => {
      this.helpsService.correctFormGroupValueRecalculatingStatusControlsAndErrorMessages(
        this.form,
        this.config
      );
    }, 2500);
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

  public importForm(event: FormGroup): FormGroup {
    return (this.form = event);
  }

  private setConfig(): any {
    return (this.config = this.activatedRoute.snapshot.data.login);
  }

  private setAttrButton() {
    return (this.attrButton = {
      route: 'login',
      icon: 'log-in',
      label: 'Entrar',
      fill: false,
      aria: 'Acessar o sistema.',
      title: 'Acessar o sistema.',
    });
  }
}
