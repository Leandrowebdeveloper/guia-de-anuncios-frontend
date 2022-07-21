import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header-component-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent implements OnInit {
  @Input() label!: string;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public close(): Promise<boolean> {
    return this.modalController.dismiss();
}

}
