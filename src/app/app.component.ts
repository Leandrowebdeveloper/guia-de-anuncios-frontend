import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private plt: Platform) {}

  ngOnInit() {
    this.plt.ready().then(async () => {
    
    });
  }
}
