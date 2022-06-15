import { User } from 'src/app/interface/index';
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
      label: 'Página do usuário'
    },
    {
      name: 'Anúncios',
      title: 'Manutenção do anúncio.',
      router: ['/painel-de-controle', 'anuncios'],
      icon: 'newspaper',
      label: 'Página de anúncio'
    },
    {
      name: 'Extatísticas',
      title: 'Manutenção do anúncios.',
      router: ['/painel-de-controle', 'extatistica'],
      icon: 'analytics',
      label: 'Página de extatística'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  public setUser(user: User){
    // console.log(user);
  }



}
