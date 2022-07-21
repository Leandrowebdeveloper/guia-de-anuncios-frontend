import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-admin',
    templateUrl: './dashboard-admin.page.html',
    styleUrls: ['./dashboard-admin.page.scss'],
})
export class DashboardPage implements OnInit {
    public readonly nav = [
        {
            name: 'Usuário',
            title: 'Manutenção do usuário.',
            router: ['/painel-de-controle/admin', 'usuario'],
            icon: 'person',
        },
        {
            name: 'Usuários',
            title: 'Manutenção do usuários.',
            router: ['/painel-de-controle/admin', 'usuarios'],
            icon: 'people',
        },
        {
            name: 'Anúncios',
            title: 'Manutenção do anúncios.',
            router: ['/painel-de-controle/admin', 'anuncios'],
            icon: 'newspaper',
        },
        // {
        //   name: 'Extatísticas',
        //   title: 'Manutenção do anúncios.',
        //   router: ['/painel-de-controle/admin', 'extatistica'],
        //   icon: 'analytics',
        // },
    ];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.setAuthSlug();
    }

    private setAuthSlug() {
        this.nav.map((nav: any, i) =>
           i === 0 && nav.router.push(this.userService.getAuthUserSlug())
        );
    }
}
