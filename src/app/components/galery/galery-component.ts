import { ToastService } from 'src/app/components/toast/toast.service';
import { HelpsService } from './../../services/helps/helps.service';
import { PhotoService } from './services/photo/photo.service';
import { ImageService } from './services/image/image.service';
import { HttpResponse, LocalFile } from 'src/app/interface/index';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-galery-component',
    templateUrl: './galery-component.html',
    styleUrls: ['./galery-component.scss'],
})
export class GaleryComponent implements OnInit {
    @Input() _csrf: string;
    @Input() slug: string;
    public spinner: number;

    private _avatar: string;
    private _images: LocalFile[] = [];
    private upload: Subscription;

    constructor(
        private modalController: ModalController,
        private photoService: PhotoService,
        private userService: UserService,
        private imageService: ImageService,
        private helpsService: HelpsService,
        private toastService: ToastService
    ) {}

    async ngOnInit() {
        this.loadFiles();
    }

    public get avatar(): string {
        return (this._avatar = this.userService.avatar.filename);
    }

    public get images(): LocalFile[] {
        return (this._images = PhotoService.images);
    }

    public loadFiles(): void {
        this.photoService.loadFiles();
        this.images;
    }

    public async selectImage() {
        return await this.photoService.selectImage();
    }

    public async startUpload(file: LocalFile, index: any): Promise<void> {
        this.startLoading(index);
        const response = await fetch(file.data);
        const blob = await response.blob();
        const formData = this.buildDataForm(blob, file);
        this.uploadData(formData);
    }

    private startLoading(index: any) {
        this.spinner = index;
    }

    private stopLoading() {
        this.spinner = null;
    }

    private buildDataForm(blob: Blob, file: LocalFile): FormData {
        const formData = new FormData();
        formData.append('id', this.slug);
        formData.append('_csrf', this._csrf);
        formData.append('filename', blob, file.name);
        return formData;
    }

    public async uploadData(formData: FormData): Promise<Subscription> {
        this.userService.setToken();
        this.userService.setCsrf(this._csrf);
        return this.sendFile(formData);
    }

    private sendFile(
        formData: FormData
    ): Subscription | PromiseLike<Subscription> {
        if (this.photoService.isPageUser()) {
            return (this.upload = this.userService
                .upload('upload', formData)
                .subscribe(
                    (response: any) => this.success(response, response),
                    (error: HttpErrorResponse) => console.log(error),
                    () => setTimeout(() => this.upload.unsubscribe(), 2000)
                ));
        }
    }

    private success(
        httpHeaderResponse: HttpHeaderResponse,
        httpResponse: HttpResponse
    ): void {
        if (httpHeaderResponse.ok && httpHeaderResponse.status === 200) {
            return this.complete(httpResponse);
        }
    }

    private complete(httpResponse: HttpResponse): void {
        const result = httpResponse.body;
        if (!!result && result[0] === 1) {
            this.setUserImage(result);
        }
    }

    private setUserImage(result: Body): void {
        this.helpsService.delay(() => {
            this.imageService.setAvatar(result);
            this.stopLoading();
        }, 2500);
        this.helpsService.delay(
            () =>
                this.toastService.show(
                    'Imagem alterada com sucesso.',
                    'bottom',
                    'thumbs-up',
                    3000
                ),
            3500
        );
    }

    public deleteImage(file: LocalFile): Subscription {
        if (this.photoService.isPageUser()) {
            return this.destroyAvatar(file);
        }
    }

    private destroyAvatar(file: LocalFile): Subscription {
        return this.imageService.avatarDestroy(this._csrf).subscribe(
            async () => {
                await this.photoService.deleteFile(file);
                this.loadFiles();
            },
            (error) => console.error(error)
        );
    }

    public close(): Promise<boolean> {
        return this.modalController.dismiss();
    }
}
