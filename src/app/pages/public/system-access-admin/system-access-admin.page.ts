import { SystemAccessService } from './services/system-access-admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AttrButton } from 'src/app/pages/public/system-access/components/buttons/interface';
import { OnComponentDeactivate } from 'src/app/components/form/guard/deactivate.guard';
import { RequisitionLimit, User } from 'src/app/interface';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HelpsService } from 'src/app/services/helps/helps.service';

@Component({
    selector: 'app-system-access',
    templateUrl: './system-access-admin.page.html',
    styleUrls: [
        './system-access-admin.page.scss',
        './../activate-account/activate-account.page.scss',
    ],
})
export class SystemAccessAdminPage implements OnInit, OnComponentDeactivate {
    public desable: boolean;
    public time: string;
    public config: User;
    public attrButton: AttrButton;
    public attrButtonPage: AttrButton;
    private form: FormGroup;
    private urlTree: boolean;
    private systemAccess: Subscription;
    private requiriment: RequisitionLimit;

    constructor(
        private activatedRoute: ActivatedRoute,
        private systemAccessService: SystemAccessService,
        private helpsService: HelpsService
    ) {}

    ngOnInit() {
        this.setConfig();
        this.setAttrButtonPage();
        this.hasDesable();
        this.initAttrButton();
    }

    public activeRoute(): string {
        return this.activatedRoute.snapshot.parent?.routeConfig?.path;
    }

    canDeactivate():
        | Observable<boolean>
        | Promise<boolean>
        | boolean
        | UrlTree {
        if (this.authorizeRoute()) {
            return this.authorizeRoute();
        } else if (this.canAuthorizeTheRoute()) {
            return this.canDeactivatedConfirmAlert();
        }
        return true;
    }

    public onSubmit(event: FormGroup): Subscription {
        return this.login(event);
    }

    public importForm(event: FormGroup): FormGroup {
        return (this.form = event);
    }

    public setDesable(event: boolean): void {
        this.desable = event;
    }

    public getTimeLeftToUnlock(): void {
        this.time = this.requiriment?.delay;
    }

    private initAttrButton(): void {
        this.attrButton = this.systemAccessService.attrButton;
    }

    private setAttrButtonPage() {
        this.attrButtonPage = this.systemAccessService.attrButton;
    }

    private disableCanDeactivate(user: User): boolean {
        return (this.urlTree = user.auth);
    }

    private authorizeRoute(): boolean {
        return this.urlTree;
    }

    private canAuthorizeTheRoute(): boolean {
        return this.helpsService.isAuthorizeTheRoute(this.form);
    }

    private canDeactivatedConfirmAlert() {
        return this.helpsService.messageAuthorizeTheRoute();
    }

    private login(event: FormGroup): Subscription {
        const loading = this.showLoading('Acessar o sistema...');
        return (this.systemAccess = this.systemAccessService
            .sendLoginData(event.value)
            .subscribe(
                (user: User) => this.success(user, loading),
                (error: HttpErrorResponse) => this.error(error, loading)
            ));
    }

    private showLoading(message: string): Promise<HTMLIonLoadingElement> {
        return this.systemAccessService.loading(message);
    }

    private success(user: User, loading: Promise<HTMLIonLoadingElement>) {
        this.disableCanDeactivate(user);
        this.formUpdate();
        return this.disableLoadingUnsubscribeRegisterVariableTriggerSuccessMessage(
            user,
            loading
        );
    }

    private disableLoadingUnsubscribeRegisterVariableTriggerSuccessMessage(
        user: User,
        loading: Promise<HTMLIonLoadingElement>
    ) {
        return this.systemAccessService.success(
            user,
            loading,
            this.systemAccess
        );
    }

    private error(
        error: HttpErrorResponse,
        loading: Promise<HTMLIonLoadingElement>
    ) {
        this.requisitionLimit(error);
        return this.systemAccessService.error(
            error,
            loading,
            this.systemAccess
        );
    }

    private requisitionLimit(error: HttpErrorResponse): void {
        if (error.status === 403) {
            this.helpsService.delay(() => {
                this.setError(error);
                this.hasDesable();
                this.formUpdate();
            }, 2500);
        }
    }

    private setError(error: HttpErrorResponse): void {
        this.requiriment = error?.error;
    }

    private formUpdate(): void {
        this.helpsService.delay(() => {
            this.helpsService.correctFormGroupValueRecalculatingStatusControlsAndErrorMessages(
                this.form,
                this.config
            );
        }, 2500);
    }

    private setConfig(): any {
        this.addConfig();
        this.addRequirement();
    }

    private addRequirement() {
        this.requiriment = this.config?.requisitionLimit;
    }

    private addConfig() {
        this.config = this.activatedRoute.snapshot.data.systemAccess;
    }

    private hasDesable(): void {
        this.getDesable();
        if (this.desable) {
            this.getTimeLeftToUnlock();
        }
    }

    private getDesable(): void {
        if (this.requiriment) {
            this.addDesable();
        }
    }

    private addDesable(): void {
        this.desable = this.isDesabled();
    }

    private isDesabled(): boolean {
        return this.requiriment.count >= 3;
    }
}
