import { EventEmitter, Input, OnInit } from '@angular/core';
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

    ngOnInit() {
       this.init();
    }

    public init() {
    //    return Promise.resolve(()=> {
            const timeDifference = this.getTime();
            const duration = this.getDuration(timeDifference);
            const minutes = this.getMinutes(duration);
            const seconds = this.getSeconds(duration);
            this.startTimer(minutes, seconds);
        // });
    }

    private getTime() {
        return this.time && moment().diff(this.time);
    }

    private startTimer(minutes: number, seconds: number): void {
        this.closed = setInterval(this.countdownTimer(minutes, seconds), 1000);
    }

    private getSeconds(duration: moment.Duration): number {
        return Math.abs(duration.seconds() - 60);
    }

    private getMinutes(duration: moment.Duration): number {
        return Math.abs(duration.minutes() - 4);
    }

    private getDuration(time: number): moment.Duration {
        return moment.duration(time);
    }

    private countdownTimer(minutes: number, seconds: number): () => void {
        return () => {
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
            this.showTime(minutes, seconds);
        };
    }

    private showTime(minutes: number, seconds: number) {
        this.timeRunningOut = this.setTime(minutes, seconds);
    }

    private setTime(minutes: number, seconds: number): string {
        return `0${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    private timeClosed(): void {
        this.desable.emit(false);
        return clearInterval(this.closed);
    }

    private stopTrigger(minutes: number): boolean {
        return minutes === -1;
    }

    private updateMuinutesEndSeconds(minutes: number, seconds: number) {
        minutes--;
        seconds = 60;
        return { minutes, seconds };
    }

    private minuteRegressiveTrigger(seconds: number): boolean {
        return seconds >= 60 || seconds === -1;
    }
}
