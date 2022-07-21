import { LoadingService } from 'src/app/utilities/loading/loading.service';
import { MessageService } from 'src/app/utilities/message/message.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interface';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class UsersService extends HttpService<User> {
    constructor(
        http: HttpClient,
        public storageService: StorageService,
        private messageService: MessageService,
        private loadingService: LoadingService
    ) {
        super(http, storageService);
        this.api = `users`;

    }


}
