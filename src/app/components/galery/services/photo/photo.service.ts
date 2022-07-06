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

@Injectable({ providedIn: 'root' })
export class PhotoService {
    private static image: LocalFile[] = [];
    private imageDir: string;

    private readonly configPhoto = {
        quality: 90,
        webUseInput: true,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        promptLabelHeader: 'Foto',
        promptLabelCancel: 'Cancelar',
        promptLabelPhoto: 'Carregue uma foto',
        promptLabelPicture: 'Tire uma foto',
    };

    constructor(private plt: Platform, private router: Router) {
        this.setImageDir();
    }

    public static get images(): LocalFile[] {
        return PhotoService.image;
    }

    public static set images(value: LocalFile[]) {
        PhotoService.image = value;
    }

    public async loadFiles(): Promise<any[] | (() => Promise<void>)> {
        try {
            PhotoService.images = [];
            const filesystem = await Filesystem.readdir(this.readdirOptions());
            this.loadFileData(filesystem.files);
        } catch (error) {
            return async () => await Filesystem.mkdir(this.readdirOptions());
        }
    }

    public async selectImage(): Promise<boolean> {
        try {
            const image = await Camera.getPhoto(this.configPhoto);
            if (image) {
                return this.saveImage(image);
            }
        } catch (error) {
            return false;
        }
    }

    public isPageUser() {
        return /usuarios/g.test(this.router.url);
    }
    public async deleteFile(file: LocalFile) {
        await Filesystem.deleteFile(this.deleteFileOptions(file));
    }

    private readdirOptions(): ReaddirOptions {
        return {
            path: this.imageDir,
            directory: Directory.Data,
        };
    }

    private setImageDir() {
        return (this.imageDir = this.isPageUser()
            ? 'stored_user'
            : 'stored_advert');
    }

    private async loadFileData(fileNames: string[]): Promise<void> {
        for (const f of fileNames) {
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

    private async saveImage(photo: Photo): Promise<boolean> {
        try {
            const base64Data = await this.readAsBase64(photo);

            const fileName = new Date().getTime() + '.jpeg';
            const savedFile = await Filesystem.writeFile({
                path: `${this.imageDir}/${fileName}`,
                data: base64Data,
                directory: Directory.Data,
            });
            this.loadFiles();
            return true;
        } catch (error) {
            return false;
        }
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

    private deleteFileOptions(file: LocalFile) {
        return {
            directory: Directory.Data,
            path: file.path,
        };
    }
}
