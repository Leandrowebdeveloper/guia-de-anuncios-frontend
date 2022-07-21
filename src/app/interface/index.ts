import { Observable } from 'rxjs';

export interface User {
    readonly id: number;
    auth: boolean;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    level: string;
    slug: string;
    authState: boolean;
    token: string;
    active: boolean;
    state: boolean;
    desabled: boolean;
    key: string;
    passwordConfirmation: string;
    stayConnected: boolean;
    image: Image;
    activateAccount: ActivateAccount;
    association: {
        readonly id: number;
    };
    _csrf: string;
    message: string;
    requisitionLimit: RequisitionLimit;
}

export interface RequisitionLimit {
    count: number;
    delay: string;
    desabled: boolean;
    time: string;
}

export interface ActivateAccount {
    // eslint-disable-next-line @typescript-eslint/naming-convention
   readonly user_id: number;
    activation: boolean;
    message: string;
}

export interface Image {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    readonly user_id: number;
    filename: string;
    url: string;
    _csrf: string;
}

export interface Breadcrumb {
    label: string;
    link: string;
}

// Interface de funções
export interface Http<T> {
    index: () => Observable<T[]>;
    findAll: (url?: string) => Observable<T>;
    create: (data: T, url?: string) => Observable<T>;
    update: (data: T) => Observable<T | number[]>;
    find: (id: string | number) => Observable<T>;
    patch: (data: T, url?: string) => Observable<T | number[]>;
    destroy: (data: T, url: string) => Observable<T | number>;
    upload: (url: string, formData: FormData) => Observable<any>;
}

export interface LocalStorage {
    create: (key: string, value: string | object) => Promise<any>;
    update: (key: string, value: string | object) => Promise<any>;
    find: (key: string) => Promise<any>;
    destroy: (key: string) => Promise<any>;
}

export interface LocalFile {
    name: string;
    path: string;
    data: string;
}

export interface HttpResponse {
    headers: Headers;
    status: number;
    statusText: string;
    url: string;
    ok: boolean;
    type: number;
    body: Body;
}
