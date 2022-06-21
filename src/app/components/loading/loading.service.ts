import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
/**
 * @class LoadingService
 */
export class LoadingService {
  constructor(private loadingController: LoadingController) {}

  public async show(message: string): Promise<HTMLIonLoadingElement> {
    const loading = this.loadingController.create({
      message,
      spinner: 'bubbles',
    });
    (await loading).present();
    return loading;
  }
}
