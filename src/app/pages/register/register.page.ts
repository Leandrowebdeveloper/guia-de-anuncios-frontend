import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface';
import { AttrButton } from 'src/app/component/buttons/system-access-page-buttons/interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public config: User;
  public attrButton: AttrButton;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.setConfig();
    this.setAttrButton();
  }

  private setConfig(): void {
    this.config = this.activatedRoute.snapshot.data.register;
  }

  private setAttrButton() {
    this.attrButton = {
      route: 'cadastrar',
      icon: 'create',
      label: 'cadastrar',
      fill: false,
      aria: 'Criar conta.',
      title: 'Criar conta.'
    }
  }

  public onSubmit(event: FormGroup){
    console.log(event)
  }

}
