import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  public data = [
    {
      route: ['painel-de-controle', 'usuarios'],
      label: 'Usuários',
      icon: 'person',
    },
    {
      route: ['painel-de-controle', 'anuncios'],
      label: 'Anúncios',
      icon: 'albums',
    },
    {
      route: ['sair'],
      label: 'Sair',
      icon: 'log-out',
    },
    {
      route: ['entrar'],
      label: 'Entrar',
      icon: 'log-in',
    },
  ];

  private auth: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.auth.unsubscribe();
  }

  private init(): Subscription {
    return (this.auth = this.authService.toggleIsLoggedIn.subscribe(
      (auth: boolean) => {
        if (auth) {
          this.data.splice(3);
        } else {
          this.data.splice(0, 3);
        }
      }
    ));
  }
}
