import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import {
    Filesystem,
    Directory,
    ReaddirOptions,
    ReadFileResult,
} from '@capacitor/filesystem';

import {
    Camera,
    CameraResultType,
    CameraSource,
    Photo,
} from '@capacitor/camera';
import { LocalFile } from 'src/app/interface';
import { Router } from '@angular/router';

@Injectable()
export class PhotoService {
    private _imageDir: string;

    private static _images: LocalFile[] = [];

    private readonly configPhoto = {
        quality: 90,
        webUseInput: true,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        promptLabelHeader: 'Foto',
        promptLabelCancel: 'Cancelar',
        promptLabelPhoto: 'Carregue uma foto',
        promptLabelPicture: 'Tire uma foto'
    };

    constructor(private plt: Platform, private router: Router) {
        this.setImageDir;
    }

    private get imageDir() {
        return this._imageDir;
    }

    private set imageDir(value) {
        this._imageDir = value;
    }

    public static get images(): LocalFile[] {
        return PhotoService._images;
    }
    public static set images(value: LocalFile[]) {
        PhotoService._images = value;
    }

    private get setImageDir() {
        return (this.imageDir = this.isPageUser()
            ? 'stored_user'
            : 'stored_advert');
    }

    public async loadFiles(): Promise<any[] | (() => Promise<void>)> {
        try {
            PhotoService.images = [];
            const filesystem = await Filesystem.readdir(this.readdirOptions);
            this.loadFileData(filesystem.files);
        } catch (error) {
            return async () => await Filesystem.mkdir(this.readdirOptions);
        }
    }

    public get readdirOptions(): ReaddirOptions {
        return {
            path: this.imageDir,
            directory: Directory.Data,
        };
    }

    private async loadFileData(fileNames: string[]): Promise<void> {
        for (let f of fileNames) {
            const filePath = `${this.imageDir}/${f}`;
            const readFile = await Filesystem.readFile(
                this.readFileOptions(filePath)
            );
            PhotoService.images.push(this.addImages(f, filePath, readFile));
        }
    }

    private addImages(
        f: string,
        filePath: string,
        readFile: ReadFileResult
    ): LocalFile {
        return {
            name: f,
            path: filePath,
            data: `data:image/jpeg;base64,${readFile.data}`,
        };
    }

    private readFileOptions(filePath: string) {
        return {
            path: filePath,
            directory: Directory.Data,
        };
    }

    public async selectImage(): Promise<void> {
        try {
            const image = await Camera.getPhoto(this.configPhoto);
            if (image) {
                this.saveImage(image);
            }
        } catch (error) {

        }
    }

    public isPageUser() {
        return /usuarios/g.test(this.router.url);
    }

    private async saveImage(photo: Photo): Promise<void> {
        const base64Data = await this.readAsBase64(photo);

        const fileName = new Date().getTime() + '.jpeg';
        const savedFile = await Filesystem.writeFile({
            path: `${this.imageDir}/${fileName}`,
            data: base64Data,
            directory: Directory.Data,
        });
        this.loadFiles();
    }

    private async readAsBase64(photo: Photo): Promise<string> {
        if (this.plt.is('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path,
            });
            return file.data;
        } else {
            const response = await fetch(photo.webPath);
            const blob = await response.blob();

            return (await this.convertBlobToBase64(blob)) as string;
        }
    }

    private convertBlobToBase64(blob: Blob): Promise<unknown> {
        const result = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
        return result;
    }

    public async deleteFile(file: LocalFile) {
        await Filesystem.deleteFile(this.deleteFileOptions(file));
    }

    private deleteFileOptions(file: LocalFile) {
        return {
            directory: Directory.Data,
            path: file.path,
        };
    }
}
