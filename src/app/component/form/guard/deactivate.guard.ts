import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface OnComponentDeactivate {
  canDeactivate: () =>
    | Observable<boolean>
    | Promise<boolean>
    | boolean
    | UrlTree;
}

@Injectable()
export class DeactivateGuard implements CanDeactivate<OnComponentDeactivate> {
  canDeactivate(
    component: OnComponentDeactivate
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate();
  }
}
