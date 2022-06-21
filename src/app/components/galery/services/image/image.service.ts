import { catchError, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image, LocalFile } from 'src/app/interface';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService extends HttpService<Image> {
  constructor(
    public http: HttpClient,
    private userService: UserService
  ) {
    super(http, `${environment.api}api/images`);
  }

  public avatarDestroy(csrf: string): Observable<number | Image> {
    return this.destroy(this.getDataImage(csrf), 'avatar').pipe(
      tap((image: Image) => this.setAvatar(image)),
      catchError((error) => {
        return EMPTY;
      })
    );
  }

  public setAvatar(result: Body | Image) {
    const avatar: Image = result[1][0];
    this.userService.avatar = avatar;
  }

  private getDataImage(csrf: string): Image {
    const { image } = this.userService.user;
    image._csrf = csrf;
    return image;
  }
}
