import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface';
import { AttrButton } from 'src/app/component/buttons/system-access-page-buttons/interface';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  public config: User;
  public attrButton: AttrButton;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.setConfig();
    this.setAttrButton();
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
      title: 'Recuperar senha.'
    }
  }

  public onSubmit(event: FormGroup){
    console.log(event)
  }

}
