import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttrButton } from 'src/app/component/buttons/system-access-page-buttons/interface';
import { User } from 'src/app/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public config: User;
  public attrButton: AttrButton;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.setConfig();
    this.setAttrButton();
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
