import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AttrButton } from './interface';

@Component({
  selector: 'app-buttons-sccess-component',
  templateUrl: './buttons-sccess-component.html',
  styleUrls: ['./buttons-sccess-component.scss'],
})

export class ButtonsAccessComponent implements OnInit {
  @Input() dataButtons: AttrButton[];
  @Input() route: string;
  constructor() {}

  ngOnInit() {
    switch (this.route) {
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
