import { catchError, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from 'src/app/interface';
import { HttpService } from 'src/app/services/http/http.service';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class ImageService extends HttpService<Image> {
    constructor(public http: HttpClient, public storageService: StorageService, private userService: UserService) {
        super(http, storageService);
        this.api = `images`;
    }

    public avatarDestroy(csrf: string): Observable<number | Image> {
        return this.destroy(this.getDataImage(csrf), 'avatar').pipe(
            tap((image: Image) => this.setAuthAvatar(image)),
            catchError((error) => EMPTY)
        );
    }

    public setAuthAvatar(result: Body | Image): Image {
        const avatar: Image = result[1][0];
        this.userService.setAuthAvatar(avatar);
        return avatar;
    }

    private getDataImage(csrf: string): Image {
        const image  = this.userService.getUserAvatar();
        image._csrf = csrf;
        return image;
    }
}
