import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SystemAccessButtons } from './interface';

@Component({
  selector: 'app-system-access-page-buttons',
  templateUrl: './system-access-page-buttons.page.html',
  styleUrls: ['./system-access-page-buttons.page.scss'],
})
/**
 * @class SystemAccessPageButtons
 */
export class SystemAccessPageButtons implements OnInit {
  @Input() dataButtons: SystemAccessButtons[]; //
  constructor() {}

  ngOnInit() {
    this.dataButtons = [
      {
        route: '/recuperar-senha',
        icon: 'key',
        label: 'Esqueceu a senha?',
        fill: true,
      },
      {
        route: '/cadastrar',
        icon: 'create',
        label: 'criar conta',
        fill: false,
      },
    ];
  }
}
