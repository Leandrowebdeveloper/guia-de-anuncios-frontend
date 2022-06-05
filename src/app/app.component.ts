import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

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
    await this.statusBar();
    setTimeout(async () => {
     await SplashScreen.hide({fadeOutDuration: 300});
    }, 100);
  }

  private async statusBar(): Promise<void> {
    StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.show();
    await StatusBar.setBackgroundColor({
      color: '#1E295C',
    });
  }
}
