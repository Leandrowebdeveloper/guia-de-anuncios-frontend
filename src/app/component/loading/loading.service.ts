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

  /**
   * @class LoadingService
   * @function show
   * @readonly Apresenta o carregamento enquanto a chamada http esta em andamento
   * @param message Menssagem
   * @type Promise<void>
   * @returns
   * @example
   * class Service {
   *    constructor(private loadingService: LoadingService) {}
   *
   *    public async loading(): Promise<HTMLIonLoadingElement> {
   *       return await this.loadingService.show('Criando conta...');
   *    }
   * }
   * Execução:
   *    public async onSubmit(event: FormGroup) {
   *       const loading = await this.loadingService.loading(); // Contrutor
   *          (await loading).present(); // on
   *          (await loading).dismiss(); // off
   *    }
   */
  public async show(message: string): Promise<HTMLIonLoadingElement> {
    return await this.loadingController.create({
      message,
      spinner: 'bubbles',
    });
  }
}
