import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AttrButton } from 'src/app/component/buttons/system-access-page-buttons/interface';
import { OnComponentDeactivate } from 'src/app/component/form/guard/deactivate.guard';
import { User } from 'src/app/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnComponentDeactivate {
  public config: User;
  public attrButton: AttrButton;
  private form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute) {}

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

  public importForm(event: FormGroup) {
    this.form = event;
  }

  private setConfig(): void {
    this.config = this.activatedRoute.snapshot.data.login;
  }

  private setAttrButton() {
    this.attrButton = {
      route: 'login',
      icon: 'log-in',
      label: 'Entrar',
      fill: false,
      aria: 'Acessar o sistema.',
      title: 'Acessar o sistema.'
    }
  }

  public onSubmit(event: FormGroup) {
    console.log(event);
  }
}
