import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { User } from 'src/app/interface';
import { AttrButton } from 'src/app/component/buttons/system-access-page-buttons/interface';
import { OnComponentDeactivate } from 'src/app/component/form/guard/deactivate.guard';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit, OnComponentDeactivate {
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
    this.config = this.activatedRoute.snapshot.data.recover;
  }

  private setAttrButton(): void {
    this.attrButton = {
      route: 'recuperar-senha',
      icon: 'arrow-up-circle',
      label: 'Recuperar senha',
      fill: false,
      aria: 'Recuperar senha.',
      title: 'Recuperar senha.',
    };
  }

  public onSubmit(event: FormGroup) {
    console.log(event);
  }
}
