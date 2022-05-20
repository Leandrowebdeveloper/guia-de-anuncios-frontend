import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AttrButton } from './interface';

@Component({
  selector: 'app-system-access-page-buttons',
  templateUrl: './system-access-page-buttons.page.html',
  styleUrls: ['./system-access-page-buttons.page.scss'],
})
/**
 * @class SystemAccessPageButtons
 */
export class SystemAccessPageButtons implements OnInit {
  @Input() dataButtons: AttrButton[]; //
  constructor() {}

  ngOnInit() {
    this.dataButtons = [
      {
        route: '/recuperar-senha',
        icon: 'key',
        label: 'Esqueceu a senha?',
        aria: 'Página recuperar senha.',
        title: 'Página recuperar senha.',
        fill: true,
      },
      {
        route: '/cadastrar',
        icon: 'create',
        label: 'criar conta',
        aria: 'Página criar conta.',
        title: 'Página criar conta.',
        fill: false,
      },
    ];
  }
}
