import { EventEmitter, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from 'src/app/interface';

@Injectable({
    providedIn: 'root',
})
export class BreadcrumbsService {
    private breadcrumbEvent = new EventEmitter<string>(null);
    private breadcrumb = new BehaviorSubject<Breadcrumb[]>([]);
    private readonly breadcrumb$ = this.breadcrumb.asObservable();

    constructor(private router: Router) {
        this.init();
    }

    public get breadcrumbs$() {
        return this.breadcrumb$;
    }

    public getEvent(): Observable<string> {
        return this.breadcrumbEvent.asObservable();
    }

    public setEvent(value: string): void {
        this.breadcrumbEvent.emit(value);
    }

    public update(url: string): void {
        return this.createBreadcrumbs(url);
    }

    private convertUrlToArray(url: string): string[] {
        const size = this.urlSize(url);
        return url.split(/[\/]/g).splice(1, size);
    }

    private urlSize(url: string): number {
        return url.length - 1;
    }

    private breadcrumbs(value: Breadcrumb[]): void {
        this.breadcrumb.next(value);
    }

    private convertUrlSlugToPhrase(url: string): string[] {
        const result = this.convertUrlToArray(url).map((item: string) =>
            item.replace(/[-]/g, ' ')
        );
        return this.convertSlugEndTitle(result);
    }

    private init(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((activeRoute: NavigationEnd) => this.start(activeRoute));
    }

    private start(activeRoute: NavigationEnd): void {
        if (activeRoute instanceof NavigationEnd) {
            this.createBreadcrumbs(activeRoute.url);
        }
    }

    private convertSlugEndTitle(slug: string[]): string[] {
        const result = slug
            .map(this.filterSlug())
            .filter((item) => item !== undefined);
            return this.title(result);

    }

    private title(result: string[]): string[] {
        if (result.length > 0 && result.includes('')) {
            result.pop();
        }
        return result;
    }

    private filterSlug(): (
        value: string,
        index: number,
        array: string[]
    ) => string {
        return (item, i) => {
            if (i > -1) {
                if (/[0-9]/g.test(item)) {
                    const rejected = item.split(' ').pop();
                    item = item.replace(rejected, '').trim();
                }
                return item;
            }
        };
    }

    private createBreadcrumbs(url: string): void {
        const breadcrumb: Breadcrumb[] = [];
        this.convertUrlSlugToPhrase(url).forEach(
            (item: string, index: number) =>
                breadcrumb.push({
                    label: this.filterLabel(item),
                    link: this.buildLink(url, index),
                })
        );
        breadcrumb.splice(4, 1);
        this.breadcrumbs(breadcrumb);
    }

    private filterLabel(label: string): string {
        switch (label) {
            case 'usuario':
                return 'usuário';
            case 'anuncio':
                return 'anúncio';
            case 'inicio':
                return 'Início';
            case 'erro':
                return 'Erro';
            default:
                return label;
        }
    }

    private buildLink(url: string, index: number): string {
        const URL = url.split('/');
        if(URL.includes('')) {URL.shift();}
        switch (index) {
            case 0:
                return `/${URL[0]}`;
            case 1:
                return `/${URL[0]}/${URL[1]}/${URL[2]}`;
            case 2:
                return `/${URL[0]}/${URL[1]}/${URL[2]}`;
            case 3:
                return url;
            default:
                return `/${this.convertUrlToArray(url)[index]}`;
        }
    }
}
