import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpsService {
  constructor() {}

  public delay(
    callback: Function,
    time: 1000 | 1500 | 2000 | 2500 | 3000
  ): number {
    return setTimeout(callback, time);
  }

  public correctFormGroupValueRecalculatingStatusControlsAndErrorMessages(
    form: FormGroup,
    patchValue: Object
  ): FormGroup {
    form.patchValue(patchValue);
    form.markAsPristine();
    return this.fixErrorMessages(form);
  }

  private fixErrorMessages(form: FormGroup): FormGroup {
    Object.keys(form.controls).forEach((element) =>
      form.controls[element].setErrors(null)
    );
    return form;
  }

  public isAuthorizeTheRoute(form: FormGroup): boolean {
    return form.dirty;
  }

  public messageAuthorizeTheRoute(): boolean {
    return confirm(
      'As alterações no formulário não foram salvas e serão descartadas, deseja prosseguir?'
    );
  }
}
