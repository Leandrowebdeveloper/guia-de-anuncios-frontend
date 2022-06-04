import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Breadcrumb } from 'src/app/interface';
import { BreadcrumpsService } from './service/breadcrumps.service';

@Component({
  selector: 'app-breadcrumps',
  templateUrl: './breadcrumps.page.html',
  styleUrls: ['./breadcrumps.page.scss'],
})
export class BreadcrumpsPage {
  public breadcrumbs$: Observable<Breadcrumb[]>;
  public hasIos: boolean;

  constructor(
    private readonly breadcrumbService: BreadcrumpsService,
    private plt: Platform
  ) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
    this.isPlatformIos();
  }

  private isPlatformIos(): boolean {
    return (this.hasIos = this.plt.is('ios'));
  }
}
