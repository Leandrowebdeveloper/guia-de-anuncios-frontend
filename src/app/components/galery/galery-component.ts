import { StorageService } from 'src/app/services/storage/storage.service';
import { HelpsService } from 'src/app/services/helps/helps.service';
import { PhotoService } from './services/photo/photo.service';
import { ImageService } from './services/image/image.service';
import { HttpResponse, Image, LocalFile } from 'src/app/interface';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Component, Input, OnInit } from '@angular/core';

import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/utilities/message/message.service';

@Component({
    selector: 'app-galery-component',
    templateUrl: './galery-component.html',
    styleUrls: ['./galery-component.scss'],
})
export class GaleryComponent implements OnInit {
    @Input() _csrf: string;
    @Input() slug: string;
    @Input() image: Image;
    public spinner: number;
    public images: LocalFile[] = [];

    public avatar: string;
    private upload: Subscription;
    private destroy: Subscription;

    constructor(
        private photoService: PhotoService,
        private userService: UserService,
        private imageService: ImageService,
        private helpsService: HelpsService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadFiles();
        this.getUserAvatarName();
    }

    public getUserAvatarName(): string {
        return (this.avatar = this.userService.getUserAvatar()?.filename);
    }

    public getUserAvatarUrl() {
        setTimeout(() => {
            if (
                this.userService.getUserAvatar()?.url &&
                this.images.length === 0
            ) {
                return this.images.unshift({
                    path: this.userService.getUserAvatar()?.url,
                    data: this.userService.getUserAvatar()?.url,
                    name: this.userService.getUserAvatar()?.filename,
                });
            }
            const icon = './../../../assets/avatar.svg';
            if (!this.userService.getUserAvatar()?.url) {
                return this.images.unshift({
                    path: icon,
                    data: icon,
                    name: null,
                });
            }
        }, 200);
    }

    public loadFiles(): void {
        this.photoService.loadFiles();
        this.setImages();
        this.getUserAvatarUrl();
    }

    public async selectImage() {
        return this.photoService.selectImage().then((res: boolean) => {
            if (res) {
                this.setImages();
                this.getUserAvatarUrl();
            }
        });
    }

    public async startUpload(file: LocalFile, index: any): Promise<void> {
        this.startLoading(index);
        const response = await fetch(file?.data);
        const blob = await response.blob();
        const formData = this.buildDataForm(blob, file);
        this.uploadData(formData);
    }

    public async deleteImage(
        file: LocalFile,
        isAvatar: boolean
    ): Promise<void | Subscription> {
        if (this.photoService.isPageUser()) {
            if (!isAvatar) {
                await this.photoService.deleteFile(file);
                return this.refresh();
            }
            return this.destroyAvatar(file);
        }
    }

    public async uploadData(formData: FormData): Promise<Subscription> {
        this.userService.setAuthCsrf(this._csrf);
        return this.sendFile(formData);
    }

    private setImages() {
        this.images = PhotoService.images;
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

    private sendFile(
        formData: FormData
    ): Subscription | PromiseLike<Subscription> {
        if (this.photoService.isPageUser()) {
            return (this.upload = this.userService
                .upload('upload', formData)
                .subscribe(
                    (response: any) =>
                        this.success(response, response, this.upload),
                    (error: HttpErrorResponse) =>
                        this.messageService.error(error, null, this.upload)
                ));
        }
    }

    private success(
        httpHeaderResponse: HttpHeaderResponse,
        httpResponse: HttpResponse,
        subscription: Subscription
    ): void {
        if (httpHeaderResponse.ok && httpHeaderResponse.status === 200) {
            return this.complete(httpResponse, subscription);
        }
    }

    private complete(
        httpResponse: HttpResponse,
        subscription: Subscription
    ): void {
        const result = httpResponse.body;
        if (!!result && result[0] === 1) {
            this.setUserImage(result, subscription);
        }
    }

    private setUserImage(result: Body, subscription: Subscription): void {
        this.helpsService.delay(() => {
            const { filename } = this.imageService.setAuthAvatar(result);
            this.avatar = filename;
            this.stopLoading();
            this.loadFiles();
            this.getUserAvatarUrl();
        }, 2500);
        this.messageService.success(
            'Imagem alterada com sucesso.',
            null,
            subscription,
            3000
        );
    }

    private destroyAvatar(file: LocalFile): Subscription {
        return (this.destroy = this.imageService
            .avatarDestroy(this._csrf)
            .subscribe(
                async () => this.refresh(true),
                (error) => this.messageService.error(error, null, this.destroy),
                () =>
                    this.helpsService.delay(
                        () => this.destroy.unsubscribe(),
                        1500
                    )
            ));
    }

    private refresh(action?: boolean) {
        this.loadFiles();
        if (action) {
            this.avatar = null;
        }
    }
}
