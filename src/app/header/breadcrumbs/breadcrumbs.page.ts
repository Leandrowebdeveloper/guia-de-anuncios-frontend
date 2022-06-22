import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Breadcrumb } from 'src/app/interface';
import { BreadcrumbsService } from './service/breadcrumbs.service';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.page.html',
    styleUrls: ['./breadcrumbs.page.scss'],
})
export class BreadcrumpsPage {
    public breadcrumbs$: Observable<Breadcrumb[]>;
    public hasIos: boolean;

    constructor(
        private readonly breadcrumbService: BreadcrumbsService,
        private plt: Platform
    ) {
        this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
        this.isPlatformIos();
    }

    private isPlatformIos(): boolean {
        return (this.hasIos = this.plt.is('ios'));
    }
}
