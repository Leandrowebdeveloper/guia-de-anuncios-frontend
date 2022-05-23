import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.breadcrumb;
  }

  /**
   * @class HeaderPage
   * @function set title
   * @type string
   * @param value string
   * @readonly Insere o valor do titulo
   */
  public set title(value: string) {
    this._title = value;
  }

  /**
   * @class HeaderPage
   * @function get title
   * @type string
   * @readonly Recupera o valor do titulo
   * @returns title
   */
  public get title() {
    return this._title;
  }
}
