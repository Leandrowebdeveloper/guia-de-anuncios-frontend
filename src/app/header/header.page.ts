import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})

/**
 * @class HeaderPage
 * @implements OnInit
 */
export class HeaderPage implements OnInit {
  private _title: string;
  public hasIos: boolean;

  constructor(
    private plt: Platform,
    private popoverController: PopoverController,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.breadcrumb;
    this.isPlatformIos();
  }

  private isPlatformIos(): boolean {
    return (this.hasIos = this.plt.is('ios'));
  }

  public set title(value: string) {
    this._title = value;
  }

  public get title() {
    return this._title;
  }

  async menuShow(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
