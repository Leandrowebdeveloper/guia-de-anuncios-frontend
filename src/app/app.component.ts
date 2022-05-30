import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private plt: Platform) {}

  ngOnInit() {
    this.plt.ready().then(async () => {
      await this.init();
    });
  }

  private async init(): Promise<void> {
    await this.showSplashScreen();
  }

  private async showSplashScreen(): Promise<void> {
    return await SplashScreen.show({
      showDuration: 3000,
      autoHide: true,
    });
  }
}
