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
  @Input() dataButtons: AttrButton[];
  @Input() router: string;
  constructor() {}

  ngOnInit() {
    switch (this.router) {
      case 'entrar':
        this.dataButtons[1].fill = true;
        return this.dataButtons.splice(0, 1);
      case 'recuperar-senha':
        this.dataButtons[0].fill = true;
        return this.dataButtons.splice(1, 1);
      case 'cadastrar':
        this.dataButtons[0].fill = true;
        return this.dataButtons.splice(2, 1);
    }
  }
}
