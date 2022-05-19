import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from 'src/app/interface';
import { BreadcrumpsService } from './service/breadcrumps.service';

@Component({
  selector: 'app-breadcrumps',
  templateUrl: './breadcrumps.page.html',
  styleUrls: ['./breadcrumps.page.scss'],
})
export class BreadcrumpsPage {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumpsService) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }
}
