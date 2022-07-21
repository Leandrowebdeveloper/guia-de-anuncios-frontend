import {
    EventEmitter,
    Input,
    OnInit,
} from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-requisition-limit',
    templateUrl: './requisition-limit.component.html',
    styleUrls: ['./requisition-limit.component.scss'],
})
export class RequisitionLimitComponent implements OnInit {
    @Input() route!: string;
    @Input() time!: string;
    @Output() desable = new EventEmitter<boolean>(false);
    public timeRunningOut: string;
    private closed: any;
    private duration: moment.Duration;

    async ngOnInit() {
        if (this.time) {
            await this.init();
            await this.startTimer();
        }
    }

    private async init(): Promise<void> {
        this.duration = await this.getDuration();
    }

    private async getTime(): Promise<number> {
        return Promise.resolve().then(
            () => this.time && moment().diff(this.time)
        );
    }

    private async startTimer(): Promise<void> {
        Promise.resolve().then(
            async () =>
                (this.closed = setInterval(
                    this.countdownTimer(
                        await this.getMinutes(),
                        await this.getSeconds()
                    ),
                    1000
                ))
        );
    }

    private async getSeconds(): Promise<number> {
        return Promise.resolve().then(() =>
            Math.abs(this.duration.seconds() - 60)
        );
    }

    private async getMinutes(): Promise<number> {
        return Promise.resolve().then(() =>
            Math.abs(this.duration.minutes() - 4)
        );
    }

    private async getDuration(): Promise<moment.Duration> {
        const timeDifference = await this.getTime();
        return Promise.resolve().then(() => moment.duration(timeDifference));
    }

    private countdownTimer(minutes: number, seconds: number): () => void {
        return async () => {
            seconds--;
            if (this.minuteRegressiveTrigger(seconds)) {
                ({ minutes, seconds } = this.updateMuinutesEndSeconds(
                    minutes,
                    seconds
                ));
            }
            if (this.stopTrigger(minutes)) {
                return this.timeClosed();
            }
            await this.showTime(minutes, seconds);
        };
    }

    private async showTime(minutes: number, seconds: number): Promise<void> {
        Promise.resolve().then(
            () => (this.timeRunningOut = this.setTime(minutes, seconds))
        );
    }

    private setTime(minutes: number, seconds: number): string {
        return `0${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    private timeClosed(): void {
        this.desable.emit(false);
        clearInterval(this.closed);
    }

    private stopTrigger(minutes: number): boolean {
        return minutes === -1;
    }

    private updateMuinutesEndSeconds(
        minutes: number,
        seconds: number
    ): {
        minutes: number;
        seconds: number;
    } {
        minutes--;
        seconds = 60;
        return { minutes, seconds };
    }

    private minuteRegressiveTrigger(seconds: number): boolean {
        return seconds >= 60 || seconds === -1;
    }
}
