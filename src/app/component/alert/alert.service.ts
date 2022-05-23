import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
/**
 * @class AlertService
 */
export class AlertService {
  constructor(public alertController: AlertController) {}

  /**
   * @class AlertService
   * @function alert
   * @readonly Modal construtor de menssagens de alertas
   * @param header Titulo da modal
   * @param message Menssagem
   * @returns Promise<any>
   * @example
   * class Services {
   *  constructor(private alertService: AlertService) {
   *    this.alertService.alert('Atenção', 'Não foi possivel cadastrar usuário')
   *  }
   * }
   */
  public async alert(header: string, message: string): Promise<any> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    return await alert.present();
  }
}
