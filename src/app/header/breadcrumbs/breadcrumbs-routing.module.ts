import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreadcrumpsPage } from './breadcrumbs.page';

const routes: Routes = [
    {
        path: '',
        component: BreadcrumpsPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BreadcrumpsPageRoutingModule {}
