import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelpsService } from 'src/app/services/helps/helps.service';
import { AlertService } from '../alert/alert.service';
import { ToastService } from '../toast/toast.service';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(
        private toastService: ToastService,
        private alertService: AlertService,
        private helpsService: HelpsService
    ) {}

    /**
     * @param message string
     * @param time 350 | 500 | 1000 | 1500 | 2000 | 2500 | 3000 | 3500
     */
    public async success(
        message: string,
        loading?: Promise<HTMLIonLoadingElement>,
        subscribe?: Subscription,
        time: any = 3000
    ): Promise<number> {
        this.disableLoadingUnsubscribeVariable(loading, subscribe);
        return this.helpsService.delay(
            async () =>
                await this.toastService.show(
                    message,
                    'bottom',
                    'thumbs-up',
                    3000
                ),
            time
        );
    }

    public alert(error: HttpErrorResponse): any {
        return this.helpsService.delay(
            () => this.alertService.alert('Atenção', error?.error),
            2000
        );
    }

    public async disableLoadingUnsubscribeVariable(
        loading: Promise<HTMLIonLoadingElement>,
        subscribe: Subscription
    ): Promise<void> {
        if (loading && subscribe) {
            this.helpsService.delay(
                async () => (await loading).dismiss(),
                2000
            );
            subscribe.unsubscribe();
        }
    }

    public error(
        error: HttpErrorResponse,
        loading?: Promise<HTMLIonLoadingElement>,
        subscribe?: Subscription
    ) {
        this.disableLoadingUnsubscribeVariable(loading, subscribe).then();
        if (error.status !== 403) {
            return this.alert(error);
        }
    }

    public async disable(
        loading: Promise<HTMLIonLoadingElement>,
        subscribe: Subscription
    ) {
        return await this.disableLoadingUnsubscribeVariable(loading, subscribe);
    }
}
