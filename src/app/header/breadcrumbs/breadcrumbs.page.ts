import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Breadcrumb } from 'src/app/interface';
import { BreadcrumbsService } from './service/breadcrumbs.service';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.page.html',
    styleUrls: ['./breadcrumbs.page.scss'],
})
export class BreadcrumpsPage implements OnInit, OnDestroy {
    public breadcrumbs$: Observable<Breadcrumb[]>;
    public hasIos: boolean;

    private $breadcrumb: Subscription;
    constructor(
        private readonly breadcrumbService: BreadcrumbsService,
        private plt: Platform
    ) {
        this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
        this.isPlatformIos();
    }

    ngOnInit(): void {
        this.update();
    }

    ngOnDestroy(): void {
        this.$breadcrumb.unsubscribe();
    }

    private isPlatformIos(): boolean {
        return (this.hasIos = this.plt.is('ios'));
    }

    private update() {
        this.$breadcrumb = this.breadcrumbService
            .getEvent()
            .subscribe((url: string) => {
                if (url) {
                    this.breadcrumbService.update(url);
                }
            });
    }
}
