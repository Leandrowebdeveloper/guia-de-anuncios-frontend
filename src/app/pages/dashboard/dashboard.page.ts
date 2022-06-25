import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public readonly nav = [
    {
      name: 'Usuários',
      title: 'Manutenção do usuário.',
      router: ['/painel-de-controle', 'usuarios'],
      icon: 'person',
      label: 'Página do usuário',
    },
    {
      name: 'Anúncios',
      title: 'Manutenção do anúncio.',
      router: ['/painel-de-controle', 'anuncios'],
      icon: 'newspaper',
      label: 'Página de anúncio',
    },
    {
      name: 'Extatísticas',
      title: 'Manutenção do anúncios.',
      router: ['/painel-de-controle', 'extatistica'],
      icon: 'analytics',
      label: 'Página de extatística',
    },
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.setSlug();
  }

  private setSlug() {
    this.nav.map((nav: any, i) => nav.router.push(this.userService.getSlug()));
  }
}
