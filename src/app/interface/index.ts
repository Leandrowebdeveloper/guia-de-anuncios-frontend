import { Observable } from 'rxjs';

export interface Init {
  token: string;
  auth: boolean;
  user: User;
}

export interface User {
  readonly id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  level: string;
  slug: string;
  state: boolean;
  token: string;
  key: string;
  passwordConfirmation: string;
  image: Image;
  activateAccount: ActivateAccount;
  association: {
    readonly id: number;
  };
  _csrf: string;
  message: string;
}


export interface ActivateAccount {
  user_id: number;
  hash: string;
  activation: boolean;
  message: string;
}

export interface Image {
  user_id: number;
  filename: string;
  url: string;
}

export interface Breadcrumb {
  label: string;
  url: string;
}

// Interface de funções
export interface Http<T> {
  findAll: (url?: string) => Observable<T>;
  create: (data: T, url?: string) => Observable<T>;
  update: (data: T) => Observable<T | number[]>;
  find: (id: string | number) => Observable<T>;
  patch: (data: T, url?: string) => Observable<T | number[]>;
  destroy: (data: T) => Observable<T | number>;
  upload: (url: string, data: any, file: File) => Observable<any>;
}

export interface LocalStorage {
  create: (key: string, value: string | object) => Promise<any>;
  update: (key: string, value: string | object) => Promise<any>;
  find: (key: string) => Promise<any>;
  destroy: (key: string) => Promise<any>;
}


